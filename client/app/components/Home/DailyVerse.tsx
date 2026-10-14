export default function DailyVerse() {
  return (
    <section className="bg-[#d8ddc6] p-4 md:p-8 border-b-2 border-[#090c0a]">
      {/* Section Header Label */}
      <div className="flex justify-between items-center mb-3 font-mono text-xs uppercase tracking-wider font-bold">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 bg-[#090c0a]"></span>
          <span>SCRIPTURAL CANON // DAILY DICTION</span>
        </div>
        <div className="text-[10px] text-[#5a655b] hidden sm:block">
          SYNCHRONIZED WITH BULUGH AL-MARAM VOL. III
        </div>
      </div>

      {/* Hadith Box Container */}
      <div className="border-2 border-[#090c0a] bg-[#d8ddc6] shadow-[6px_6px_0px_0px_#090c0a] overflow-hidden">
        {/* Top bar inside box */}
        <div className="bg-[#c5ea31] border-b-2 border-[#090c0a] px-4 py-2 flex flex-wrap items-center justify-between font-mono text-xs font-bold text-[#090c0a]">
          <div className="flex items-center space-x-3">
            <span className="bg-[#090c0a] text-white px-2 py-0.5 text-[10px] uppercase">
              DAILY VERIFICATION
            </span>
            <span>HADITH #0342 - SAHIH AL-BUKHARI</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
            <span>ISNAD VALIDATED • SAHIH</span>
          </div>
        </div>

        {/* Arabic Hadith Text Display */}
        <div className="p-8 md:p-12 text-center bg-[#e4e9d3] border-b-2 border-[#090c0a]">
          <p
            dir="rtl"
            className="font-arabic text-4xl sm:text-5xl md:text-6xl text-[#090c0a] leading-loose font-bold tracking-wide"
          >
            طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
          </p>
        </div>

        {/* English Translation & References */}
        <div className="p-6 bg-[#d8ddc6] font-mono">
          <div className="text-[10px] text-[#5a655b] uppercase font-bold mb-1">
            AUTHORITATIVE LITERAL TRANSLATION:
          </div>
          <p className="text-base sm:text-lg text-[#090c0a] font-bold mb-6">
            &quot;The seeking of sacred knowledge is an obligatory injunction incumbent upon every Muslim.&quot;
          </p>

          {/* Reference Meta Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#cdd4b9] border border-[#090c0a] text-[11px] mb-4">
            <div>
              <div className="text-[#5a655b] uppercase text-[9px]">CANONICAL SOURCE:</div>
              <div className="font-bold text-[#090c0a]">Kitab Al-&apos;Ilm (The Book of Knowledge)</div>
            </div>
            <div>
              <div className="text-[#5a655b] uppercase text-[9px]">CANONICAL CITATION:</div>
              <div className="font-bold text-[#090c0a]">Chapter 4, Description 224</div>
            </div>
            <div>
              <div className="text-[#5a655b] uppercase text-[9px]">VERIFIED ISNAD GRAD:</div>
              <div className="font-bold text-[#090c0a]">Authentic Mutawatir | Authentic (Al-Albani)</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs font-bold uppercase">
            <button className="border border-[#090c0a] bg-white py-2.5 px-3 hover:bg-[#c5ea31] transition-colors flex items-center justify-center space-x-2">
              <span>💾 SAVE TO REFERENCE</span>
            </button>
            <button className="border border-[#090c0a] bg-white py-2.5 px-3 hover:bg-[#c5ea31] transition-colors flex items-center justify-center space-x-2">
              <span>🔍 VIEW ISNAD CHAIN (7 TRANSMITTERS)</span>
            </button>
            <button className="border border-[#090c0a] bg-white py-2.5 px-3 hover:bg-[#c5ea31] transition-colors flex items-center justify-center space-x-2">
              <span>💬 DISCUSS ON COMMUNITY BOARD (44)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}