"use client";

import { useState } from "react";
import Link from "next/link";

const CURRICULUM_DETAILS = [
  {
    id: "nazrah",
    title: "1. Nazrah Qur'an Classes",
    arabic: "قراءة القرآن الكريم",
    audience: "Beginners & All Ages",
    description: "Learn to read the Holy Qur'an with correct letter recognition and pronunciation from the ground up.",
    topics: [
      "Arabic alphabet recognition and pronunciation (Makharij basics)",
      "Connecting letters, vowels (Harakat), and Tanween",
      "Rules of Sukoon, Shaddah, and Madd rules",
      "Direct fluent reading practice from the Uthmani Mushaf",
    ],
  },
  {
    id: "tajweed",
    title: "2. Tajweed Classes",
    arabic: "علم التجويد والإتقان",
    audience: "Intermediate Readers",
    description: "Master the exact phonetic rules of Qur'anic recitation according to classical scholar consensus.",
    topics: [
      "Exact anatomical points of letter articulation (Makharij al-Huroof)",
      "Intrinsic and conditional letter attributes (Sifaat al-Huroof)",
      "Rules of Noon Sakinah, Tanween, Meem Sakinah, and Idgham",
      "Practical recitation feedback and verse-by-verse correction",
    ],
  },
  {
    id: "arabic",
    title: "3. Arabic Language Course",
    arabic: "اللغة العربية الفصحى",
    audience: "Students of Knowledge",
    description: "Understand the language of the Qur'an through classical grammar, morphology, and vocabulary.",
    topics: [
      "Core sentence structure: Nominal (Ismiyyah) and Verbal (Fi'liyyah)",
      "Essential noun declension (I'rab) and preposition usage",
      "Root letter verb conjugations across past, present, and imperative",
      "Direct translation and vocabulary of frequently recurring Qur'anic words",
    ],
  },
  {
    id: "seerah",
    title: "4. Seerah Course",
    arabic: "السيرة النبوية الشريفة",
    audience: "Youth & Adults",
    description: "Chronological study of the life, character, and prophetic mission of Prophet Muhammad ﷺ.",
    topics: [
      "Pre-Islamic Arabia and the blessed lineage of the Prophet ﷺ",
      "The Meccan period: early revelations, persecution, and steadfastness",
      "The Hijrah and building the Medina community and covenant",
      "Moral character (Shama'il) and lessons for modern personal conduct",
    ],
  },
  {
    id: "taharah",
    title: "5. Taharah Course",
    arabic: "فقه الطهارة والصلاة",
    audience: "Every Muslim",
    description: "Practical jurisprudence of purification and prayer according to authentic prophetic Sunnah.",
    topics: [
      "Classification of water and removal of physical impurities (Najasah)",
      "Complete step-by-step method and nullifiers of Wudu and Ghusl",
      "Rules of Tayammum and wiping over socks (Masah)",
      "Essential conditions, pillars, and corrections in daily Salah",
    ],
  },
  {
    id: "hifz",
    title: "6. Hifz Course",
    arabic: "حفظ القرآن الكريم",
    audience: "Committed Memorizers",
    description: "A disciplined, systematic memorization program combining new retention and daily revision cycles.",
    topics: [
      "Sabaq: Daily new verse memorization under teacher supervision",
      "Sabqi: Revision of the recently memorized Juz to prevent slips",
      "Manzil: Regular cyclic review of earlier completed sections",
      "Mutashabihat: Navigating similar and recurring Qur'anic passages",
    ],
  },
  {
    id: "group-qaida",
    title: "7. Group Classes (Qaida, Quran & Tajweed)",
    arabic: "حلقات التعليم الجماعي",
    audience: "All Students & Cohorts",
    description: "Structured live group meets where multiple students study together in a collaborative virtual circle under a qualified instructor.",
    topics: [
      "Group recitation practice and collective pronunciation exercises",
      "Interactive live meets with individual turns and immediate feedback",
      "Collaborative peer learning encouraging consistent attendance",
      "Separated male and female cohorts for student comfort",
    ],
  },
];

const FAQS = [
  {
    q: "Do I need any previous Arabic background to start?",
    a: "No prior knowledge is needed. Our foundational Qaida and Nazrah courses begin from basic Arabic letter recognition and vocal phonetics, guiding you step-by-step.",
  },
  {
    q: "How are classes conducted?",
    a: "Classes take place live via video conferencing (Google Meet / Zoom) in an interactive group setting where multiple students join together. Instructors share digital Mushaf texts, listen to student recitations, and provide direct corrections.",
  },
  {
    q: "How many students attend each live meet?",
    a: "Classes are conducted in collaborative group cohorts, giving students the benefit of active peer listening, collective recitation, and direct guidance from certified scholars.",
  },
  {
    q: "Are female instructors available for sisters and young children?",
    a: "Yes. We have qualified female scholars and Qari'ahs dedicated to teaching female students and children in a comfortable, supportive environment.",
  },
  {
    q: "What if I miss a scheduled group class?",
    a: "Class lesson notes and catch-up coordination are provided via the student portal so you can stay aligned with your cohort's curriculum.",
  },
  {
    q: "Do students receive certificates upon completion?",
    a: "Yes. Students who successfully complete a curriculum track and pass the final oral review receive an official certificate from Addinu Yusr Institute.",
  },
];

export default function LearningFacts() {
  const [selectedCourse, setSelectedCourse] = useState(CURRICULUM_DETAILS[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="bg-[#faf8f5] border-b border-[#e6e0d4] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: How Learning Works (4-Step Process) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 text-xs font-sans font-semibold text-[#166236] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
              <span>Educational Process</span>
            </div>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#14241c] tracking-tight">
              How Learning Works at Addinu Yusr
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-600 mt-2">
              A transparent, disciplined path from your first assessment to confident recitation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl border border-[#e6e0d4] bg-white shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#166236] font-serif font-bold text-lg flex items-center justify-center mb-4 border border-emerald-100">
                01
              </div>
              <h3 className="font-serif font-bold text-base text-[#14241c] mb-2">Level Assessment</h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                An initial diagnostic session to evaluate your current pronunciation, fluency, and goals to assign the appropriate starting point.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#e6e0d4] bg-white shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#166236] font-serif font-bold text-lg flex items-center justify-center mb-4 border border-emerald-100">
                02
              </div>
              <h3 className="font-serif font-bold text-base text-[#14241c] mb-2">Flexible Schedule</h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Select your convenient days and timing slots. Morning, afternoon, and evening availability across all major international timezones.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#e6e0d4] bg-white shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#166236] font-serif font-bold text-lg flex items-center justify-center mb-4 border border-emerald-100">
                03
              </div>
              <h3 className="font-serif font-bold text-base text-[#14241c] mb-2">Live Group Meets</h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Interactive video meetings with fellow students. Participate in group recitation, listening exercises, and direct teacher corrections.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#e6e0d4] bg-white shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#166236] font-serif font-bold text-lg flex items-center justify-center mb-4 border border-emerald-100">
                04
              </div>
              <h3 className="font-serif font-bold text-base text-[#14241c] mb-2">Progress & Ijazah</h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Regular attendance tracking and milestone reviews in the student portal, leading to formal certification upon course completion.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Curriculum Exploration */}
        <div className="p-8 sm:p-10 rounded-3xl border border-[#e6e0d4] bg-white shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-100">
            <div>
              <span className="text-xs font-sans font-semibold uppercase text-[#166236] tracking-wider">
                Explore Curriculum Details
              </span>
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#14241c] mt-1">
                Course Syllabus & Learning Outcomes
              </h2>
            </div>
            <span className="text-xs font-sans text-gray-500 mt-2 md:mt-0">
              Select a course below to view exact topics covered
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* List of 7 courses */}
            <div className="lg:col-span-5 space-y-2">
              {CURRICULUM_DETAILS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCourse(c)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedCourse.id === c.id
                      ? "border-[#166236] bg-[#166236] text-white shadow-xs"
                      : "border-gray-100 bg-[#faf8f5] text-[#14241c] hover:bg-stone-50"
                  }`}
                >
                  <div>
                    <div className="font-sans font-bold text-xs">{c.title}</div>
                    <div className={`text-[10px] ${selectedCourse.id === c.id ? "text-emerald-100" : "text-gray-500"}`}>
                      {c.audience}
                    </div>
                  </div>
                  <span className="text-xs">→</span>
                </button>
              ))}
            </div>

            {/* Selected course details box */}
            <div className="lg:col-span-7 rounded-2xl border border-[#e6e0d4] bg-[#faf8f5]/60 p-6 sm:p-8">
              <div className="mb-4 pb-4 border-b border-[#e6e0d4]">
                <h3 className="font-serif font-bold text-xl text-[#14241c]">{selectedCourse.title}</h3>
                <div className="font-arabic text-lg font-bold text-[#166236] mt-1 text-left">
                  {selectedCourse.arabic}
                </div>
                <div className="text-xs text-gray-500 mt-1">Target Audience: <strong className="text-[#14241c]">{selectedCourse.audience}</strong></div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-gray-700 leading-relaxed mb-6">
                {selectedCourse.description}
              </p>

              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#166236] mb-3">
                  Key Topics & Practical Syllabus:
                </h4>
                <div className="space-y-2.5">
                  {selectedCourse.topics.map((t, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-gray-700 font-sans">
                      <span className="text-[#166236] font-bold mt-0.5">✓</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#e6e0d4] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-500 font-sans">
                  Available in 1-on-1 private tuition and small groups.
                </span>
                <Link
                  href="/courses"
                  className="bg-[#166236] text-white rounded-xl px-5 py-2.5 font-sans font-semibold text-xs tracking-wider hover:bg-[#114e2a] transition-all shadow-xs"
                >
                  Explore All Courses →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions (FAQ) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 text-xs font-sans font-semibold text-[#166236] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#166236]"></span>
              <span>Common Inquiries</span>
            </div>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#14241c] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-600 mt-2">
              Straightforward information to help you begin your studies with clarity.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#e6e0d4] bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center text-xs sm:text-sm font-sans font-semibold text-[#14241c] hover:bg-stone-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#166236] font-bold text-base ml-4">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-gray-600 font-sans leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
