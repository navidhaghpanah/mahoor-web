"use server";
import { prisma } from "@/lib/prisma";
import { createToken, setTokenCookie, removeTokenCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    // اعتبارسنجی
    if (!name || !email || !phone || !password) {
      return { error: "لطفاً تمام فیلدها را پر کنید." };
    }

    if (password.length < 6) {
      return { error: "رمز عبور باید حداقل ۶ کاراکتر باشد." };
    }

    // بررسی تکراری نبودن ایمیل
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "این ایمیل قبلاً ثبت شده است." };
    }

    // بررسی تکراری نبودن شماره تلفن
    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      return { error: "این شماره تلفن قبلاً ثبت شده است." };
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, 10);

    // ساخت کاربر جدید
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "USER",
      },
    });

    // ساخت توکن
    const token = await createToken(user.id);
    await setTokenCookie(token);

    return { success: true };
  } catch (error: any) {
    console.error("Register error:", error);
    return { error: `خطا در ثبت‌نام: ${error.message || "خطای ناشناخته"}` };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // اعتبارسنجی
    if (!email || !password) {
      return { error: "لطفاً ایمیل و رمز عبور را وارد کنید." };
    }

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "ایمیل یا رمز عبور اشتباه است." };
    }

    // بررسی رمز عبور
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { error: "ایمیل یا رمز عبور اشتباه است." };
    }

    // ساخت توکن
    const token = await createToken(user.id);
    await setTokenCookie(token);

    return { success: true, role: user.role };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: `خطا در ورود: ${error.message || "خطای ناشناخته"}` };
  }
}

export async function logoutUser() {
  try {
    await removeTokenCookie();
    return { success: true };
  } catch (error: any) {
    console.error("Logout error:", error);
    return { error: "خطا در خروج" };
  }
}