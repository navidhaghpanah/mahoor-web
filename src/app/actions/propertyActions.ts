"use server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProperty(formData: FormData) {
  try {
    // ۱. بررسی اینکه کاربر وارد شده است
    const userId = await getCurrentUser();
    console.log("Current User ID:", userId); // برای دیباگ
    
    if (!userId) {
      return { error: "شما باید وارد حساب کاربری خود شوید. لطفاً دوباره لاگین کنید." };
    }

    // ۲. دریافت اطلاعات از فرم
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const priceStr = formData.get("price") as string;
    const areaStr = formData.get("area") as string;
    const bedroomsStr = formData.get("bedrooms") as string;
    const bathroomsStr = formData.get("bathrooms") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const latitudeStr = formData.get("latitude") as string;
    const longitudeStr = formData.get("longitude") as string;
    const imageUrlsString = formData.get("imageUrls") as string;

    console.log("Form data received:", { title, type, priceStr, latitudeStr, longitudeStr });

    // ۳. اعتبارسنجی مقادیر عددی
    const price = parseInt(priceStr);
    const area = parseInt(areaStr);
    const bedrooms = parseInt(bedroomsStr);
    const bathrooms = parseInt(bathroomsStr);
    const latitude = parseFloat(latitudeStr);
    const longitude = parseFloat(longitudeStr);

    if (isNaN(price) || isNaN(area) || isNaN(bedrooms) || isNaN(bathrooms)) {
      return { error: "مقادیر عددی (قیمت، متراژ، اتاق خواب) به درستی وارد نشده‌اند." };
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      return { error: "لطفاً موقعیت ملک را روی نقشه مشخص کنید." };
    }

    // ۴. تبدیل JSON به آرایه
    let imageUrls: string[] = [];
    try {
      imageUrls = JSON.parse(imageUrlsString);
    } catch {
      return { error: "خطا در پردازش تصاویر. لطفاً دوباره تصاویر را آپلود کنید." };
    }

    if (imageUrls.length === 0) {
      return { error: "حداقل یک تصویر باید آپلود شود." };
    }

    // ۵. ساخت رکوردهای تصویر
    const imageRecords = imageUrls.map((url, index) => ({
      url: url,
      isPrimary: index === 0,
    }));

    // ۶. ذخیره در دیتابیس
    const property = await prisma.property.create({
      data: {
        title,
        type,
        price,
        area,
        bedrooms,
        bathrooms,
        description,
        address,
        latitude,
        longitude,
        status: "PENDING",
        agentId: userId,
        images: {
          create: imageRecords,
        },
      },
    });

    console.log("Property created successfully:", property.id);

    // ۷. به‌روزرسانی کش
    revalidatePath("/agent");
    revalidatePath("/properties");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating property:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    
    // نمایش خطای دقیق‌تر
    if (error.code === "P2002") {
      return { error: "یک آگهی با این مشخصات قبلاً ثبت شده است." };
    }
    
    return { error: `خطا در ثبت آگهی: ${error.message || "خطای ناشناخته"}` };
  }
}