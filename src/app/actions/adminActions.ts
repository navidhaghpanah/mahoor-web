"use server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updatePropertyStatus(propertyId: string, status: "ACTIVE" | "REJECTED") {
  // ۱. بررسی اینکه کاربر وارد شده و ادمین است
  const userId = await getCurrentUser();
  if (!userId) {
    return { error: "شما باید وارد حساب کاربری خود شوید." };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") {
    return { error: "دسترسی غیرمجاز: فقط ادمین‌ها می‌توانند این عمل را انجام دهند." };
  }

  try {
    // ۲. تغییر وضعیت آگهی در دیتابیس
    await prisma.property.update({
      where: { id: propertyId },
      data: { status },
    });

    // ۳. به‌روزرسانی کش
    revalidatePath("/admin");
    revalidatePath("/properties");

    return { success: true };
  } catch (error) {
    console.error("Error updating property status:", error);
    return { error: "خطا در تغییر وضعیت آگهی. لطفاً دوباره تلاش کنید." };
  }
}

export async function deleteProperty(propertyId: string) {
  // ۱. بررسی اینکه کاربر وارد شده و ادمین است
  const userId = await getCurrentUser();
  if (!userId) {
    return { error: "شما باید وارد حساب کاربری خود شوید." };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") {
    return { error: "دسترسی غیرمجاز: فقط ادمین‌ها می‌توانند این عمل را انجام دهند." };
  }

  try {
    // ۲. حذف آگهی از دیتابیس
    await prisma.property.delete({
      where: { id: propertyId },
    });

    // ۳. به‌روزرسانی کش
    revalidatePath("/admin");
    revalidatePath("/properties");

    return { success: true };
  } catch (error) {
    console.error("Error deleting property:", error);
    return { error: "خطا در حذف آگهی. لطفاً دوباره تلاش کنید." };
  }
}