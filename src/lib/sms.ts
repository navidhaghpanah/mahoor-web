export type SmsProvider = "inbox" | "kavenegar" | "melipayamak" | "smsir" | "ippanel";

export type SmsConfig = {
  smsProvider: SmsProvider;
  smsApiKey: string;
  smsPassword: string;
  smsTemplate: string;
  smsSender: string;
};

const PROVIDERS: SmsProvider[] = ["inbox", "kavenegar", "melipayamak", "smsir", "ippanel"];

export function smsConfig(): SmsConfig {
  const p = (process.env.SMS_PROVIDER || "inbox").toLowerCase();
  return {
    smsProvider: PROVIDERS.includes(p as SmsProvider) ? (p as SmsProvider) : "inbox",
    smsApiKey: process.env.SMS_API_KEY || "",
    smsPassword: process.env.SMS_PASSWORD || "",
    smsTemplate: process.env.SMS_TEMPLATE || "verify",
    smsSender: process.env.SMS_SENDER || "",
  };
}

export function smsLive(cfg = smsConfig()) {
  return cfg.smsProvider !== "inbox" && Boolean(cfg.smsApiKey);
}

export function iranPhone(raw: string): string {
  let p = raw.replace(/\D/g, "");
  if (p.startsWith("0098")) p = p.slice(4);
  if (p.startsWith("98")) p = p.slice(2);
  if (p.startsWith("0")) p = p.slice(1);
  return `0${p}`;
}

function otpMessage(code: string) {
  return `کد تایید املاک ماهور: ${code}`;
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

    if (provider === "melipayamak") {
      const res = await fetch("https://rest.payamak-panel.com/api/SendSMS/SendSMS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: key,
          password: settings.smsPassword,
          to,
          from: settings.smsSender || "",
          text: otpMessage(code),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { RetStatus?: number; StrRetStatus?: string };
      if (data.RetStatus === 1) return { sent: true, via: "melipayamak" };
      return { sent: false, via: "melipayamak", error: data.StrRetStatus || "ارسال پیامک ناموفق" };
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
