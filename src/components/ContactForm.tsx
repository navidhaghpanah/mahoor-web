"use client";
import { useState } from "react";
import { sendMessage } from "@/app/actions/messageActions";
import { Send, Loader2 } from "lucide-react";

interface ContactFormProps {
  propertyId: string;
  agentId: string;
}

export default function ContactForm({ propertyId, agentId }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setError("");

    formData.append("propertyId", propertyId);
    formData.append("agentId", agentId);

    const result = await sendMessage(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setError(result.error || "خطا در ارسال پیام");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 p-5 rounded-xl text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">✅</span>
        </div>
        <p className="font-bold mb-1">پیام شما با موفقیت ارسال شد!</p>
        <p className="text-sm">مشاور به زودی با شما تماس خواهد گرفت.</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          نام شما
        </label>
        <input
          name="senderName"
          required
          className="input-modern"
          placeholder="مثال: علی محمدی"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          شماره تماس
        </label>
        <input
          name="senderPhone"
          type="tel"
          required
          className="input-modern"
          placeholder="09123456789"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          پیام شما
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="input-modern resize-none"
          placeholder="مثال: آیا امکان بازدید فردا ساعت ۵ وجود دارد؟"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>در حال ارسال...</span>
          </>
        ) : (
          <>
            <Send size={20} />
            ارسال پیام به مشاور
          </>
        )}
      </button>
    </form>
  );
}