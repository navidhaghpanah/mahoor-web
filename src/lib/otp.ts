import { prisma } from "@/lib/prisma";
import { iranPhone, otpFresh } from "@/lib/sms";

type OtpRow = { phone: string; code: string; created_at: Date; verified: boolean };

export async function ensureOtpTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS otp_codes (
      phone TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      verified BOOLEAN NOT NULL DEFAULT FALSE
    )
  `);
}

export async function putOtp(phone: string, code: string) {
  const p = iranPhone(phone);
  await ensureOtpTable();
  await prisma.$executeRaw`
    INSERT INTO otp_codes (phone, code, created_at, verified)
    VALUES (${p}, ${code}, NOW(), false)
    ON CONFLICT (phone) DO UPDATE SET code = ${code}, created_at = NOW(), verified = false
  `;
}

export async function getOtp(phone: string) {
  const p = iranPhone(phone);
  await ensureOtpTable();
  const rows = await prisma.$queryRaw<OtpRow[]>`
    SELECT phone, code, created_at, verified FROM otp_codes WHERE phone = ${p} LIMIT 1
  `;
  return rows[0] || null;
}

export async function markOtpVerified(phone: string) {
  const p = iranPhone(phone);
  await prisma.$executeRaw`UPDATE otp_codes SET verified = true WHERE phone = ${p}`;
}

export async function consumeOtp(phone: string, code: string) {
  const rec = await getOtp(phone);
  if (!rec || rec.code !== String(code).trim() || !otpFresh(rec.created_at)) return false;
  await markOtpVerified(phone);
  return true;
}
