import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consumeOtp } from "@/lib/otp";
import { iranPhone, smsLive } from "@/lib/sms";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    phone?: string;
    message?: string;
    code?: string;
  };
  const name = (body.name || "").trim();
  const phone = iranPhone(body.phone || "");
  const message = (body.message || "").trim();
  if (!name || phone.length < 11 || !message) {
    return NextResponse.json({ ok: false, error: "اطلاعات کامل نیست" }, { status: 400 });
  }
  if (smsLive()) {
    const ok = await consumeOtp(phone, body.code || "");
    if (!ok) return NextResponse.json({ ok: false, error: "ابتدا کد پیامک را تایید کنید" }, { status: 400 });
  }
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS contact_leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  const id = crypto.randomUUID();
  await prisma.$executeRaw`
    INSERT INTO contact_leads (id, name, phone, message, created_at)
    VALUES (${id}, ${name}, ${phone}, ${message}, NOW())
  `;
  return NextResponse.json({ ok: true });
}
