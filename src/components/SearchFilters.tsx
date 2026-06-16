"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minArea: searchParams.get("minArea") || "",
    maxArea: searchParams.get("maxArea") || "",
    bedrooms: searchParams.get("bedrooms") || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.minArea) params.set("minArea", filters.minArea);
    if (filters.maxArea) params.set("maxArea", filters.maxArea);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);

    router.push(`/search?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="text-[#1e3a5f]" size={24} />
        <h2 className="text-xl font-bold text-gray-900">جستجوی پیشرفته</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">کلمه کلیدی (عنوان یا آدرس)</label>
          <input
            name="keyword"
            value={filters.keyword}
            onChange={handleChange}
            className="input-modern"
            placeholder="مثال: آپارتمان نوساز، سعادت‌آباد..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نوع معامله</label>
          <select name="type" value={filters.type} onChange={handleChange} className="input-modern">
            <option value="">همه</option>
            <option value="SALE">فروش</option>
            <option value="RENT">اجاره</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حداقل قیمت (تومان)</label>
          <input
            name="minPrice"
            type="number"
            value={filters.minPrice}
            onChange={handleChange}
            className="input-modern"
            placeholder="حداقل"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر قیمت (تومان)</label>
          <input
            name="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={handleChange}
            className="input-modern"
            placeholder="حداکثر"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حداقل متراژ (متر)</label>
          <input
            name="minArea"
            type="number"
            value={filters.minArea}
            onChange={handleChange}
            className="input-modern"
            placeholder="حداقل"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر متراژ (متر)</label>
          <input
            name="maxArea"
            type="number"
            value={filters.maxArea}
            onChange={handleChange}
            className="input-modern"
            placeholder="حداکثر"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">تعداد اتاق خواب</label>
          <select name="bedrooms" value={filters.bedrooms} onChange={handleChange} className="input-modern">
            <option value="">همه</option>
            <option value="1">۱ اتاق</option>
            <option value="2">۲ اتاق</option>
            <option value="3">۳ اتاق</option>
            <option value="4">۴+ اتاق</option>
          </select>
        </div>

        <div className="lg:col-span-4 flex justify-end mt-2">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Search size={20} />
            جستجو
          </button>
        </div>
      </form>
    </div>
  );
}