export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MessageSquare, Phone, Calendar, Home } from "lucide-react";

export default async function AdminMessagesPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-8 rounded-2xl text-red-700 border border-red-200">
          <h2 className="text-xl font-bold mb-2">دسترسی غیرمجاز</h2>
          <p>فقط ادمین‌ها می‌توانند به این صفحه دسترسی داشته باشند.</p>
        </div>
      </div>
    );
  }

  const messages = await prisma.message.findMany({
    include: {
      property: { select: { title: true } },
      agent: { select: { name: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
              <MessageSquare className="text-[#d4af37]" size={24} />
            </div>
            پیام‌های دریافتی
          </h1>
          <p className="text-gray-600 mt-2">
            همه پیام‌های ارسالی از طرف مشتریان به مشاوران
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <MessageSquare className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">هنوز پیامی دریافت نشده است</h3>
            <p className="text-gray-500">
              وقتی مشتریان پیامی ارسال کنند، در اینجا نمایش داده می‌شود.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <Home size={18} className="text-[#1e3a5f]" />
                      {msg.property.title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(msg.createdAt).toLocaleString("fa-IR")}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>نام فرستنده:</strong> {msg.senderName}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Phone size={14} />
                    <strong>شماره تماس:</strong> 
                    <a href={`tel:${msg.senderPhone}`} className="text-[#1e3a5f] hover:underline">
                      {msg.senderPhone}
                    </a>
                  </p>
                </div>

                <div className="bg-blue-50 border-r-4 border-[#1e3a5f] rounded-lg p-4">
                  <p className="text-gray-800 whitespace-pre-line leading-7">
                    {msg.content}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <p>
                    <strong>مشاور:</strong> {msg.agent.name} | 
                    <strong> تماس:</strong> {msg.agent.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}