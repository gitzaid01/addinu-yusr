export default function CommunityAndPledge() {
  return (
    <section className="bg-[#d8ddc6] p-4 md:p-8 border-b-2 border-[#090c0a]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Community Discussion Column (7 cols) */}
        <div className="lg:col-span-7 border-2 border-[#090c0a] bg-[#090c0a] text-white p-6 md:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#090c0a]">
          <div>
            {/* Header info */}
            <div className="flex justify-between items-center text-[11px] font-mono text-[#9baa90] border-b border-[#242c26] pb-3 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500"></span>
                <span>WALK-IN FORUM DISPATCH // ACTIVE INQUIRY</span>
              </div>
              <span>THREAD #4482</span>
            </div>

            {/* Question title */}
            <div className="text-[11px] font-mono text-[#c5ea31] uppercase mb-1">
              TOPIC INQUIRY [SH. AHMAD] // THREAD RANK 01
            </div>
            <h3 className="font-mono font-bold text-xl md:text-2xl text-white uppercase leading-snug mb-4">
              &quot;HOW SHOULD AN ADVANCED STUDENT BALANCE RAPID TEXTUAL MEMORIZATION (HIFDH) WITH EXHAUSTIVE CONTEXTUAL COMMENTARY (SHARH) IN EARLY STAGES?&quot;
            </h3>

            {/* Content snippet */}
            <p className="font-mono text-xs text-[#d8ddc6] leading-relaxed mb-6 border-l-2 border-[#c5ea31] pl-3">
              In classical manuals such as &quot;Tadrib al-Rawi&quot;, priority is often granted to verbatim
              retention of Matn before delving into Ikhtilaf. Does the Tawtheeq curriculum
              recommend simultaneous mastering of Sharh at Al-Waraqat or serial memorization?
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px]">
              <span className="bg-[#242c26] text-[#c5ea31] px-2 py-0.5 border border-[#5a655b]">
                #METHODOLOGY
              </span>
              <span className="bg-[#242c26] text-white px-2 py-0.5 border border-[#5a655b]">
                #STUDY_HABITS
              </span>
              <span className="bg-[#242c26] text-white px-2 py-0.5 border border-[#5a655b]">
                #USUL-AL-FIQH
              </span>
              <span className="bg-[#c5ea31] text-[#090c0a] font-bold px-2 py-0.5">
                VERIFIED INSTRUCTOR PINNED
              </span>
            </div>
          </div>

          {/* Footer action */}
          <div className="border-t border-[#242c26] pt-4 flex flex-wrap items-center justify-between font-mono text-xs">
            <div className="text-[#9baa90] text-[11px]">
              <span>112 SCHOLARLY REPLIES</span> • <span>3,410 ARCHIVAL VIEWS</span>
            </div>
            <button className="bg-[#c5ea31] text-[#090c0a] px-5 py-2.5 font-bold uppercase hover:bg-[#b0d624] transition-colors flex items-center space-x-2">
              <span>ENTER DISCUSSION</span>
              <span>-&gt;</span>
            </button>
          </div>
        </div>

        {/* Rigor & Privacy Pledge Column (5 cols) */}
        <div className="lg:col-span-5 border-2 border-[#090c0a] bg-[#d8ddc6] p-6 md:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#090c0a]">
          <div>
            <div className="bg-[#c5ea31] border border-[#090c0a] px-3 py-1 text-[11px] font-mono font-bold uppercase inline-block mb-4">
              RIGOROUS ENROLLMENT
            </div>

            <h3 className="font-mono font-extrabold text-2xl text-[#090c0a] uppercase tracking-tight mb-4">
              STUDY RIGOR & PRIVACY PLEDGE
            </h3>

            <p className="font-mono text-xs text-[#1a231b] leading-relaxed mb-6">
              Addinu Yusr operates as an academic sanctuary. We reject modern surveillance analytics, engagement metrics, algorithm bias, and superficial gamification.
            </p>

            <ul className="space-y-3 font-mono text-xs text-[#090c0a] mb-6">
              <li className="flex items-start space-x-2">
                <span className="bg-[#090c0a] text-white text-[9px] px-1 font-bold mt-0.5">☑</span>
                <span><strong>UNCOMPROMISED SCHOLARSHIP:</strong> Learn under verified Institutional Ijazah structures without commercial rate distraction.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-[#090c0a] text-white text-[9px] px-1 font-bold mt-0.5">☑</span>
                <span><strong>ZERO TRACKING TELEMETRY:</strong> No third party analytics, trackers, or commercial monetization exists.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-[#090c0a] text-white text-[9px] px-1 font-bold mt-0.5">☑</span>
                <span><strong>PERMANENT CITATION LOGS:</strong> All personal annotated research stays cryptographically verified and exportable.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-[#090c0a] pt-4 flex items-center justify-between font-mono text-xs">
            <span className="text-[10px] text-[#5a655b]">PLEDGE REF CODE: REG-3760-A</span>
            <a href="/ethics" className="font-bold underline uppercase text-[#090c0a] hover:text-emerald-800">
              READ CODE PROTOCOL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}