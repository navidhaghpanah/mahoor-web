"use server";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword, createToken } from "@/lib/auth";
import { cookies } from "next/headers";

// دستور ثبت‌نام کاربر جدید
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  // بررسی اینکه کاربر قبلاً ثبت‌نام نکرده باشد
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] },
  });

  if (existingUser) {
    return { error: "این ایمیل یا شماره موبایل قبلاً ثبت شده است." };
  }

  // هش کردن رمز عبور
  const hashedPassword = await hashPassword(password);

  // ساخت کاربر جدید
  const user = await prisma.user.create({
    data: { name, email, phone, password: hashedPassword, role: "USER" },
  });

  // ساخت توکن و ذخیره در کوکی
  const token = createToken(user.id);
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // ۷ روز
    path: "/",
  });

  return { success: true };
}

// دستور ورود کاربر
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // پیدا کردن کاربر با ایمیل
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "ایمیل یا رمز عبور اشتباه است." };
  }

  // بررسی رمز عبور
  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return { error: "ایمیل یا رمز عبور اشتباه است." };
  }

  // ساخت توکن و ذخیره در کوکی
  const token = createToken(user.id);
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true, role: user.role };
}

// دستور خروج کاربر
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return { success: true };
}