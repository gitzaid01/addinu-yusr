"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { contentService } from "@/lib/api";

interface PublishedItem {
  id?: string;
  _id?: string;
  title: string;
  slug?: string;
  content: string;
  type: string;
  status: string;
  publishedAt?: string;
  createdAt?: string;
  authorId?: {
    name?: string;
  };
}

export default function DailyVerse() {
  const [items, setItems] = useState<PublishedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetchPublished();
  }, []);

  const fetchPublished = async () => {
    try {
      const data = await contentService.getPublishedContent();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to load admin published content:", err);
    } finally {
      setLoading(false);
    }
  };

  const activeItem = items[selectedIndex];

  // Helper to detect Arabic paragraphs for special typography
  const renderFormattedContent = (text: string) => {
    if (!text) return null;
    const paragraphs = text.split("\n\n").filter(Boolean);

    return paragraphs.map((para, idx) => {
      const hasArabic = /[\u0600-\u06FF]/.test(para);

      if (hasArabic) {
        return (
          <div
            key={idx}
            className="p-6 sm:p-8 bg-[#faf8f5]/60 border-y border-[#e6e0d4] my-4 rounded-2xl text-left"
          >
            <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#166236] leading-relaxed font-bold text-left">
              {para}
            </p>
          </div>
        );
      }

      return (
        <p key={idx} className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
          {para}
        </p>
      );
    });
  };

  return (
    <section className="bg-[#faf8f5] p-6 md:p-12 border-b border-[#e6e0d4]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Label */}
        <div className="flex justify-between items-center mb-6 font-sans text-xs uppercase tracking-wider font-semibold">
          <div className="flex items-center space-x-2">
            <span className="text-[#14241c] font-bold">Admin Publications // Hadith & Sacred Reflections</span>
          </div>
          <div className="text-[11px] text-gray-500 hidden sm:block">
            Official Academy Announcements & Teachings
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="rounded-3xl border border-[#e6e0d4] bg-white p-12 text-center font-sans text-xs text-gray-500 shadow-xs">
            Loading official published content from administration...
          </div>
        )}

        {/* Empty State: Only displays content published by the admin */}
        {!loading && items.length === 0 && (
          <div className="rounded-3xl border border-[#e6e0d4] bg-white p-10 sm:p-14 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#166236] flex items-center justify-center mx-auto mb-4 border border-emerald-100 text-xl font-serif">
              ✦
            </div>
            <h3 className="font-serif font-bold text-lg text-[#14241c] mb-2">
              No Content Published Yet
            </h3>
            <p className="font-sans text-xs text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
              This section strictly displays Hadiths, articles, and reflections published directly by the administrator. Content will appear here once published from the Administrative Console.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 bg-[#166236] text-white px-5 py-2.5 rounded-xl font-sans text-xs font-bold hover:bg-[#114e2a] transition-all shadow-xs"
            >
              <span>Admin Console</span>
              <span>→</span>
            </Link>
          </div>
        )}

        {/* Dynamic Admin-Published Content Container */}
        {!loading && activeItem && (
          <div className="rounded-3xl border border-[#e6e0d4] bg-white shadow-xs overflow-hidden">
            {/* Top Bar with Badge, Title, Date & Author */}
            <div className="bg-[#166236] px-6 py-4 flex flex-wrap items-center justify-between font-sans text-xs font-semibold text-white gap-2">
              <div className="flex items-center space-x-3 flex-wrap">
                <span className="bg-[#14241c] text-white px-3 py-1 text-[10px] uppercase rounded-full tracking-wider font-bold">
                  {activeItem.type || "HADITH"}
                </span>
                <span className="font-serif text-sm text-emerald-50 font-bold">
                  {activeItem.title}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-[11px] text-emerald-100">
                <span>
                  Published {activeItem.publishedAt ? new Date(activeItem.publishedAt).toLocaleDateString() : "Recently"}
                </span>
                <span>•</span>
                <span>By {activeItem.authorId?.name || "Administration"}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 bg-white">
              <div className="max-w-4xl mx-auto">
                {renderFormattedContent(activeItem.content)}
              </div>

              {/* Multiple Items Selector / Navigation */}
              {items.length > 1 && (
                <div className="mt-8 pt-6 border-t border-[#e6e0d4] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-sans text-gray-500">
                      Post {selectedIndex + 1} of {items.length}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      disabled={selectedIndex === 0}
                      onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
                      className="px-3 py-1.5 rounded-xl border border-[#e6e0d4] text-xs font-semibold text-[#14241c] disabled:opacity-40 hover:bg-[#faf8f5] transition-all cursor-pointer"
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      disabled={selectedIndex === items.length - 1}
                      onClick={() => setSelectedIndex((prev) => Math.min(items.length - 1, prev + 1))}
                      className="px-3 py-1.5 rounded-xl border border-[#e6e0d4] text-xs font-semibold text-[#14241c] disabled:opacity-40 hover:bg-[#faf8f5] transition-all cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}