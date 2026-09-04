export type SmsProvider = "inbox" | "kavenegar" | "melipayamak" | "smartsms" | "smsir" | "ippanel";

export type SmsConfig = {
  smsProvider: SmsProvider;
  smsApiKey: string;
  smsPassword: string;
  smsTemplate: string;
  smsSender: string;
  smsSupportOne: string;
  smsSupportTwo: string;
};

const PROVIDERS: SmsProvider[] = ["inbox", "kavenegar", "melipayamak", "smartsms", "smsir", "ippanel"];

export function smsConfig(): SmsConfig {
  const irKey = process.env.SMS_IR_API_KEY || "";
  const irTemplate = process.env.SMS_IR_TEMPLATE_ID || "";
  let p = (process.env.SMS_PROVIDER || "").toLowerCase();
  if (!p) {
    if (process.env.SMS_API_KEY && process.env.SMS_PASSWORD) p = "smartsms";
    else if (irKey) p = "smsir";
    else p = "inbox";
  }
  return {
    smsProvider: PROVIDERS.includes(p as SmsProvider) ? (p as SmsProvider) : "inbox",
    smsApiKey: process.env.SMS_API_KEY || irKey,
    smsPassword: process.env.SMS_PASSWORD || "",
    smsTemplate: process.env.SMS_TEMPLATE || irTemplate || "verify",
    smsSender: process.env.SMS_SENDER || "",
    smsSupportOne: process.env.SMS_SENDER_2 || "",
    smsSupportTwo: process.env.SMS_SENDER_3 || "",
  };
}

export function smsLive(cfg = smsConfig()) {
  if (cfg.smsProvider === "inbox") return false;
  if (cfg.smsProvider === "smartsms" || cfg.smsProvider === "melipayamak") {
    return Boolean(cfg.smsApiKey && cfg.smsPassword);
  }
  return Boolean(cfg.smsApiKey);
}

export function iranPhone(raw: string): string {
  let p = raw.replace(/\D/g, "");
  if (p.startsWith("0098")) p = p.slice(4);
  if (p.startsWith("98")) p = p.slice(2);
  if (p.startsWith("0")) p = p.slice(1);
  return `0${p}`;
}

function otpMessage(code: string) {
  return `کد تایید املاک ماهور: ${code}\nلغو11`;
}

function smartSmsError(code: unknown, fallback: string) {
  const n = String(code ?? "");
  const map: Record<string, string> = {
    "0": "نام کاربری یا کلید وب‌سرویس اشتباه است",
    "2": "اعتبار پیامک کافی نیست",
    "4": "محدودیت تعداد گیرنده",
    "5": "شماره خط فرستنده معتبر نیست",
    "7": "متن پیامک فیلتر شد",
    "9": "ارسال از خط عمومی مجاز نیست",
    "14": "متن پیامک نباید لینک داشته باشد",
    "15": "متن پیامک باید عبارت لغو۱۱ داشته باشد",
  };
  return map[n] || fallback;
}

async function sendSmartSms(
  settings: SmsConfig,
  to: string,
  code: string,
): Promise<{ sent: boolean; via: string; error?: string }> {
  const username = (settings.smsApiKey || "").trim();
  const password = (settings.smsPassword || "").trim();
  const from = (settings.smsSender || "").trim();
  if (!username || !password) {
    return { sent: false, via: "smartsms", error: "نام کاربری یا ApiKey پیامک تنظیم نشده" };
  }
  if (!from) {
    return { sent: false, via: "smartsms", error: "شماره خط فرستنده تنظیم نشده" };
  }
  const body: Record<string, string> = {
    username,
    password,
    to,
    text: otpMessage(code),
    from,
  };
  if (settings.smsSupportOne) body.fromSupportOne = settings.smsSupportOne;
  if (settings.smsSupportTwo) body.fromSupportTwo = settings.smsSupportTwo;
  const res = await fetch("https://rest.payamak-panel.com/api/SmartSMS/Send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as {
    Value?: string;
    RetStatus?: number;
    StrRetStatus?: string;
    ReqStatus?: string | number;
    Message?: string;
  };
  const ok =
    data.RetStatus === 1 ||
    data.ReqStatus === 1 ||
    data.ReqStatus === "1" ||
    (res.ok && Boolean(data.Value) && !["0", "2", "4", "5", "7", "9", "14", "15"].includes(String(data.Value)));
  if (ok) return { sent: true, via: "smartsms" };
  return {
    sent: false,
    via: "smartsms",
    error: data.Message || data.StrRetStatus || smartSmsError(data.RetStatus ?? data.ReqStatus ?? data.Value, "ارسال پیامک ناموفق"),
  };
}

export async function sendOtpSms(
  settings: SmsConfig,
  phone: string,
  code: string,
): Promise<{ sent: boolean; via: string; error?: string }> {
  const to = iranPhone(phone);
  const provider = settings.smsProvider;
  const key = (settings.smsApiKey || "").trim();
  if (provider === "inbox" || !key) {
    return { sent: false, via: "inbox" };
  }

  try {
    if (provider === "kavenegar") {
      const template = (settings.smsTemplate || "verify").trim();
      const url = new URL(`https://api.kavenegar.com/v1/${key}/verify/lookup.json`);
      url.searchParams.set("receptor", to);
      url.searchParams.set("token", code);
      url.searchParams.set("template", template);
      const res = await fetch(url, { cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as {
        return?: { status?: number; message?: string };
      };
      const status = data.return?.status ?? res.status;
      if (status === 200) return { sent: true, via: "kavenegar" };
      if (status === 424 || /template/i.test(data.return?.message || "")) {
        const sendUrl = new URL(`https://api.kavenegar.com/v1/${key}/sms/send.json`);
        sendUrl.searchParams.set("receptor", to);
        if (settings.smsSender) sendUrl.searchParams.set("sender", settings.smsSender);
        sendUrl.searchParams.set("message", otpMessage(code));
        const sendRes = await fetch(sendUrl, { cache: "no-store" });
        const sendData = (await sendRes.json().catch(() => ({}))) as {
          return?: { status?: number; message?: string };
        };
        if ((sendData.return?.status ?? sendRes.status) === 200) {
          return { sent: true, via: "kavenegar" };
        }
        return { sent: false, via: "kavenegar", error: sendData.return?.message || "ارسال پیامک ناموفق" };
      }
      return { sent: false, via: "kavenegar", error: data.return?.message || "ارسال پیامک ناموفق" };
    }

    if (provider === "smartsms" || provider === "melipayamak") {
      return await sendSmartSms(settings, to, code);
    }

    if (provider === "smsir") {
      const templateId = Number(settings.smsTemplate);
      const headers = { "Content-Type": "application/json", "x-api-key": key };
      if (Number.isFinite(templateId) && templateId > 0) {
        const res = await fetch("https://api.sms.ir/v1/send/verify", {
          method: "POST",
          headers,
          body: JSON.stringify({
            mobile: to,
            templateId,
            parameters: [
              { name: "CODE", value: code },
              { name: "code", value: code },
            ],
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { status?: number; message?: string };
        if (data.status === 1) return { sent: true, via: "smsir" };
        return { sent: false, via: "smsir", error: data.message || "ارسال پیامک ناموفق" };
      }
      const res = await fetch("https://api.sms.ir/v1/send/bulk", {
        method: "POST",
        headers,
        body: JSON.stringify({
          lineNumber: settings.smsSender || undefined,
          mobiles: [to],
          messageText: otpMessage(code),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { status?: number; message?: string };
      if (data.status === 1) return { sent: true, via: "smsir" };
      return { sent: false, via: "smsir", error: data.message || "ارسال پیامک ناموفق" };
    }

    if (provider === "ippanel") {
      const pattern = (settings.smsTemplate || "").trim();
      const receptor98 = `98${to.replace(/^0/, "")}`;
      if (settings.smsPassword) {
        const res = await fetch("https://ippanel.com/api/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            op: pattern ? "pattern" : "send",
            user: key,
            pass: settings.smsPassword,
            from: settings.smsSender || "",
            to: [to],
            pattern_code: pattern || undefined,
            input_data: pattern ? [{ code }] : undefined,
            message: pattern ? undefined : otpMessage(code),
          }),
        });
        if (res.ok) return { sent: true, via: "ippanel" };
        return { sent: false, via: "ippanel", error: "ارسال پیامک ناموفق" };
      }
      const res = await fetch("https://edge.ippanel.com/v1/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `AccessKey ${key}`,
        },
        body: JSON.stringify({
          sending_type: pattern ? "pattern" : "sms",
          from_number: settings.smsSender || undefined,
          code: pattern || undefined,
          recipients: [receptor98],
          params: pattern ? { code, verification: code } : undefined,
          message: pattern ? undefined : otpMessage(code),
        }),
      });
      if (res.ok) return { sent: true, via: "ippanel" };
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
      return { sent: false, via: "ippanel", error: data.message || data.error || "ارسال پیامک ناموفق" };
    }
  } catch (e) {
    return { sent: false, via: provider, error: e instanceof Error ? e.message : "خطای پیامک" };
  }

  return { sent: false, via: "inbox" };
}

export function otpFresh(createdAt: Date | string, minutes = 5) {
  return Date.now() - new Date(createdAt).getTime() < minutes * 60 * 1000;
}
