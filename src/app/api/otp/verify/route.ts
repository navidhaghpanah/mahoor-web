import { NextResponse } from "next/server";
import { consumeOtp } from "@/lib/otp";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { phone?: string; code?: string };
  const ok = await consumeOtp(body.phone || "", body.code || "");
  if (!ok) return NextResponse.json({ ok: false, error: "کد اشتباه یا منقضی است" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
