export default function AdmissionsCta() {
  return (
    <section className="bg-[#d8ddc6] p-4 md:p-8 border-b-2 border-[#090c0a]">
      <div className="bg-[#c5ea31] border-2 border-[#090c0a] p-8 md:p-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 shadow-[8px_8px_0px_0px_#090c0a]">
        {/* Text Left */}
        <div className="max-w-2xl">
          <div className="bg-[#090c0a] text-[#c5ea31] font-mono text-[11px] font-bold uppercase px-3 py-1 inline-block mb-4">
            ADMISSIONS OPEN // SEMESTER II
          </div>
          <h2 className="font-mono font-extrabold text-3xl md:text-5xl text-[#090c0a] uppercase tracking-tight leading-tight mb-4">
            BECOME A CERTIFIED TAHQIQ RESEARCHER
          </h2>
          <p className="font-mono text-sm md:text-base text-[#090c0a] font-semibold leading-relaxed">
            Pass the preliminary Arabic syntax and Hadith terminology assessment to gain access to restricted primary source archives and live scholarly halaqat.
          </p>
        </div>

        {/* Action Buttons Right */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px]">
          <button className="bg-[#090c0a] text-white border-2 border-[#090c0a] py-4 px-8 font-mono font-bold text-sm uppercase tracking-wider hover:bg-[#161b17] transition-all text-center shadow-[4px_4px_0px_0px_#ffffff]">
            BEGIN APPLICATION PROTOCOL
          </button>
          <button className="bg-transparent text-[#090c0a] border-2 border-[#090c0a] py-3 px-6 font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#090c0a]/10 transition-all text-center">
            VIEW ADMISSIONS CRITERIA (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}