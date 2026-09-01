import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCurrentUser } from "@/lib/auth";

// محدودیت حجم برای این route (۱۰ مگابایت)
export const maxDuration = 30;
export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 10;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: NextRequest) {
  try {
    if (!await getCurrentUser()) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (files.length === 0 || files.length > MAX_FILES) {
      return NextResponse.json({ success: false, error: "بین ۱ تا ۱۰ تصویر انتخاب کنید." }, { status: 400 });
    }
    
    // ساخت پوشه uploads اگر وجود نداشته باشد
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const urls: string[] = [];

    for (const file of files) {
      if (!(file instanceof File) || !ALLOWED_IMAGE_TYPES.has(file.type)) {
        return NextResponse.json({ success: false, error: "فقط تصویر JPEG، PNG یا WebP مجاز است." }, { status: 400 });
      }

      if (file.size === 0 || file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ 
          success: false, 
          error: `فایل ${file.name} بیش از ۵ مگابایت است.` 
        }, { status: 400 });
      }

      // ساخت نام فایل یکتا
      const ext = file.type === "image/jpeg" ? ".jpg" : file.type === "image/png" ? ".png" : ".webp";
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
