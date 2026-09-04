import { NextResponse } from "next/server";
import { getOtp, putOtp } from "@/lib/otp";
import { iranPhone, sendOtpSms, smsConfig } from "@/lib/sms";

function code() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { phone?: string };
  const phone = iranPhone(body.phone || "");
  if (phone.length < 11) {
    return NextResponse.json({ ok: false, error: "شماره معتبر نیست" }, { status: 400 });
  }
  const last = await getOtp(phone).catch(() => null);
  if (last && Date.now() - new Date(last.created_at).getTime() < 60_000) {
    return NextResponse.json({ ok: false, error: "کد قبلاً ارسال شده. کمی صبر کنید." }, { status: 429 });
  }
  const otp = code();
  await putOtp(phone, otp);
  const cfg = smsConfig();
  const sms = await sendOtpSms(cfg, phone, otp);
  if (cfg.smsProvider !== "inbox" && cfg.smsApiKey && !sms.sent) {
    return NextResponse.json({ ok: false, error: sms.error || "ارسال پیامک ناموفق" }, { status: 502 });
  }
  return NextResponse.json({
    ok: true,
    via: sms.via,
    needCode: sms.sent,
    message: sms.sent ? "کد تایید پیامک شد" : "کد در سامانه ثبت شد",
  });
}
