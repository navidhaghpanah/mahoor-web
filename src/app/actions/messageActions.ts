"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
  try {
    const propertyId = formData.get("propertyId") as string;
    const agentId = formData.get("agentId") as string;
    const senderName = formData.get("senderName") as string;
    const senderPhone = formData.get("senderPhone") as string;
    const messageText = formData.get("message") as string;

    // اعتبارسنجی
    if (!senderName || !senderPhone || !messageText) {
      return { error: "لطفاً تمام فیلدها را پر کنید." };
    }

    if (senderName.length > 100 || senderPhone.length > 32 || messageText.length > 2_000) {
      return { error: "اطلاعات ارسالی معتبر نیست." };
    }

    // Never trust the agent id supplied by the browser. The property owns the recipient.
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { agentId: true },
    });

    if (!property || property.agentId !== agentId) {
      return { error: "آگهی موردنظر یافت نشد." };
    }

    // ساخت محتوای پیام
    const content = `پیام:\n${messageText}`;

    // ذخیره در دیتابیس (با نام و شماره مستقیم)
    await prisma.message.create({
      data: {
        content,
        senderName,
        senderPhone,
        propertyId,
        agentId: property.agentId,
      },
    });

    // به‌روزرسانی کش
    revalidatePath("/agent/messages");

    return { success: true };
  } catch (error: any) {
    console.error("Error sending message:", error);
    return { error: `خطا در ارسال پیام: ${error.message || "خطای ناشناخته"}` };
  }
}
