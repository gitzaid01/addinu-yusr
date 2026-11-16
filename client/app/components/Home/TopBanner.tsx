export default function TopBanner() {
  return (
    <div className="bg-[#14241c] text-emerald-100/90 text-xs font-sans border-b border-[#14241c]/30 py-2 px-4 flex flex-wrap justify-between items-center gap-2">
      <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="bg-[#166236] text-white px-2.5 py-0.5 font-bold uppercase text-[9px] tracking-wider rounded-full shadow-xs">
          Notice
        </span>
        <span className="text-emerald-50 text-[11px] font-medium">
          Academic Term 1446-1447 AH • New Enrollments Open Worldwide • Live Group Cohorts Available
        </span>
      </div>

      <div className="hidden sm:flex items-center space-x-4 text-[11px] text-emerald-200/70">
        <span>
          Portal: <strong className="text-white font-medium">Addinu Yusr Online</strong>
        </span>
        <span className="text-emerald-800">|</span>
        <span>
          Live Instruction: <strong className="text-emerald-300 font-medium">Google Meet & Zoom</strong>
        </span>
      </div>
    </div>
  );
}
