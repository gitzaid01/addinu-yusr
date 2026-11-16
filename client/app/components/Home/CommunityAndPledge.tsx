export default function CommunityAndPledge() {
  return (
    <section className="bg-[#faf8f5] p-6 md:p-12 border-b border-[#e6e0d4]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Community Discussion Column (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#14241c] text-white p-6 md:p-8 flex flex-col justify-between shadow-xs border border-[#14241c]">
          <div>
            {/* Header info */}
            <div className="flex justify-between items-center text-xs font-sans text-emerald-200/80 border-b border-emerald-900 pb-3 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Student Community Forum // Academic Discussion</span>
              </div>
              <span className="text-emerald-300/60">Thread #4482</span>
            </div>

            {/* Question title */}
            <div className="text-xs font-sans text-emerald-300 uppercase mb-2 font-bold tracking-wide">
              Scholarly Inquiry // Tajweed & Memorization
            </div>
            <h3 className="font-serif font-bold text-xl md:text-2xl text-white leading-snug mb-4">
              &quot;How should a beginning student balance daily new recitation (Nazrah) with memorization of foundational Surahs?&quot;
            </h3>

            {/* Content snippet */}
            <p className="font-sans text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6 border-l-2 border-[#166236] pl-3">
              In classical learning manuals, priority is placed on establishing sound pronunciation of the Arabic letters (Makharij) and fluent reading before progressing to rapid memorization. Our teachers ensure every vowel and pause is mastered patiently.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6 font-sans text-[11px]">
              <span className="bg-[#1e3328] text-emerald-200 px-3 py-1 rounded-full border border-emerald-900/60">
                #TajweedRules
              </span>
              <span className="bg-[#1e3328] text-emerald-200 px-3 py-1 rounded-full border border-emerald-900/60">
                #Qur'anRecitation
              </span>
              <span className="bg-[#1e3328] text-emerald-200 px-3 py-1 rounded-full border border-emerald-900/60">
                #DailyRoutine
              </span>
              <span className="bg-[#166236] text-white font-semibold px-3 py-1 rounded-full shadow-xs">
                Verified Teacher Guidance
              </span>
            </div>
          </div>

          {/* Footer action */}
          <div className="border-t border-emerald-900 pt-4 flex flex-wrap items-center justify-between font-sans text-xs">
            <div className="text-emerald-200/70 text-xs">
              <span>Community of seekers across 20+ countries</span>
            </div>
            <button className="bg-[#166236] text-white px-5 py-2.5 rounded-xl font-bold uppercase hover:bg-[#114e2a] transition-all shadow-xs flex items-center space-x-2 cursor-pointer">
              <span>View Discussions</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Rigor & Privacy Pledge Column (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-[#e6e0d4] bg-white p-6 md:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="bg-[#166236] text-white px-3.5 py-1 text-xs font-sans font-semibold uppercase inline-block mb-4 rounded-full shadow-xs">
              Academic Standards
            </div>

            <h3 className="font-serif font-bold text-2xl text-[#14241c] tracking-tight mb-4">
              Commitment to Sacred Knowledge
            </h3>

            <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              Addinu Yusr is founded upon traditional Islamic pedagogical values: sincere intention, accuracy, patient mentorship, and respect between teacher and student.
            </p>

            <ul className="space-y-3 font-sans text-xs text-gray-700 mb-6">
              <li className="flex items-start space-x-2.5">
                <span className="text-[#166236] font-bold mt-0.5">✓</span>
                <span><strong>Authentic Teaching:</strong> Learn under certified instructors with direct chains of transmission in Tajweed and classical texts.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="text-[#166236] font-bold mt-0.5">✓</span>
                <span><strong>Safe & Focused Environment:</strong> Dedicated private classrooms without distractions, ads, or commercial disruptions.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <span className="text-[#166236] font-bold mt-0.5">✓</span>
                <span><strong>Continuous Support:</strong> Direct feedback from your teacher after every session with measurable milestone tracking.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-4 flex items-center justify-between font-sans text-xs">
            <span className="text-[11px] text-gray-500">Academic Code of Ethics</span>
            <span className="font-semibold text-[#166236]">
              Addinu Yusr Institute
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}