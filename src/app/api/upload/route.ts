import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// محدودیت حجم برای این route (۱۰ مگابایت)
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images") as File[];
    
    // ساخت پوشه uploads اگر وجود نداشته باشد
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const urls: string[] = [];

    for (const file of files) {
      // بررسی حجم فایل (حداکثر ۵ مگابایت)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ 
          success: false, 
          error: `فایل ${file.name} بیش از ۵ مگابایت است.` 
        }, { status: 400 });
      }

      // ساخت نام فایل یکتا
      const ext = path.extname(file.name);
      const newFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
      const filePath = path.join(uploadDir, newFilename);
      
      // ذخیره فایل
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);
      
      urls.push(`/uploads/${newFilename}`);
    }

    return NextResponse.json({ success: true, urls }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "خطا در آپلود فایل" }, { status: 500 });
  }
}