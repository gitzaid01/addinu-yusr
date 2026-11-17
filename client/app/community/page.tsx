"use client";

import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Footer from "@/app/components/Home/Footer";
import Link from "next/link";

export default function CommunityPage() {
  const directCall = "+966 50 478 1226";
  const directCallTel = "tel:+966504781226";
  const whatsappNumber = "+91 8171432372";
  const whatsappClean = "918171432372";
  const channelUrl = "https://whatsapp.com/channel/0029VbAuHQYGZND0ODsmGm1O";
  const chatUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
    "Assalamu Alaikum, I would like to inquire about the Addinu Yusr community and student groups."
  )}`;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans antialiased selection:bg-[#166236] selection:text-white flex flex-col">
      <TopBanner />
      <Header activeTab="COMMUNITY FORUM" />

      <main className="flex-1 py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb & Section Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase text-emerald-800 tracking-wider mb-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Community Forum</span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#14241c] tracking-tight">
            Addinu Yusr Student & Scholar Community
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
            Connect with our global network of learners, teachers, and seekers of sacred Islamic knowledge. Engage in moderated scholarly discussions, access daily verses, and receive real-time class announcements.
          </p>
        </div>

        {/* Highlighted Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Official WhatsApp Channel */}
          <div className="bg-gradient-to-br from-[#14241c] to-[#1e3328] rounded-3xl p-6 sm:p-8 text-white border border-[#14241c] flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span>Broadcast Channel</span>
                </span>
                <span className="text-xs text-emerald-200/70 font-mono">Channel #0029</span>
              </div>

              <h2 className="font-serif font-bold text-2xl text-white mb-3">
                Official WhatsApp Channel
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
                Join our verified WhatsApp channel for instant updates, live lecture notifications, daily Qur&apos;anic gems, and authentic academic schedules directly to your phone.
              </p>

              <ul className="space-y-2.5 text-xs text-emerald-100/80 mb-8">
                <li className="flex items-center space-x-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>Daily Qur&apos;anic reflections & Tajweed pointers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>Upcoming course registration reminders & timetables</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>100% spam-free, private & officially moderated</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-emerald-900/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-emerald-300/80">
                Open to all students & enthusiasts
              </span>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-[#14241c] font-bold text-xs uppercase px-6 py-3 rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer"
              >
                <span>Join Channel Now</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </div>

          {/* Card 2: Direct Academic Inquiries & Student Support */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6e0d4] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-emerald-50 border border-emerald-200 text-[#166236] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Direct Support
                </span>
                <span className="text-xs font-mono font-semibold text-[#166236]">
                  {whatsappNumber}
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl text-[#14241c] mb-3">
                Direct Call & WhatsApp Support
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                Have questions about course placement, 1-on-1 Nazrah and Tajweed classes, or group sessions? Reach out directly to our administration team by phone or WhatsApp for prompt assistance.
              </p>

              <div className="bg-[#faf8f5] p-4 rounded-2xl border border-[#e6e0d4] mb-6 space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-semibold text-gray-800">Support Hours:</span>
                  <span>Monday – Saturday (9:00 AM – 9:00 PM)</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-semibold text-gray-800">Direct Phone Call:</span>
                  <a href={directCallTel} className="font-bold text-[#166236] hover:underline flex items-center space-x-1">
                    <span>{directCall}</span>
                    <span>📞</span>
                  </a>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-semibold text-gray-800">Official WhatsApp:</span>
                  <span className="font-bold text-[#166236]">{whatsappNumber}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-semibold text-gray-800">Typical Response:</span>
                  <span className="text-emerald-700 font-semibold">Instant / Under 15 minutes</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gray-500">
                Helpline: {directCall}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={directCallTel}
                  className="bg-[#14241c] hover:bg-[#1e3328] text-white font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
                  </svg>
                  <span>Direct Call</span>
                </a>
                <a
                  href={chatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#166236] hover:bg-[#114e2a] text-white font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Chat on WhatsApp</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Community Principles / Code of Conduct */}
        <div className="bg-[#f4efe6] rounded-3xl p-6 sm:p-8 border border-[#e6e0d4]">
          <div className="max-w-3xl">
            <h3 className="font-serif font-bold text-xl text-[#14241c] mb-3">
              Islamic Etiquette in Learning Communities (Adab)
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
              Our institute community upholds the traditional Islamic manners of seeking knowledge (Adab al-Talib): respect towards teachers, courteous dialogue among peers, and grounding every discussion in authenticated sources.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-[#e6e0d4]/80">
                <div className="font-bold text-xs text-[#166236] mb-1">1. Respect & Humility</div>
                <div className="text-[11px] text-gray-600">Treat fellow students with dignity and address instructors with traditional honorifics.</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e6e0d4]/80">
                <div className="font-bold text-xs text-[#166236] mb-1">2. Sound Verification</div>
                <div className="text-[11px] text-gray-600">Ensure any shared citations or hadith are verified through qualified scholarly faculty.</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e6e0d4]/80">
                <div className="font-bold text-xs text-[#166236] mb-1">3. Focused Purpose</div>
                <div className="text-[11px] text-gray-600">Keep channel discourse strictly focused on sacred sciences, coursework, and spiritual growth.</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
