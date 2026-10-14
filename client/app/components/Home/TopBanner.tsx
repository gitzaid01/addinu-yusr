export default function TopBanner() {
  return (
    <div className="bg-[#090c0a] text-[#d8ddc6] text-[11px] font-mono border-b border-[#090c0a] py-1 px-4 flex flex-wrap justify-between items-center gap-2 tracking-tight">
      <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="bg-[#c5ea31] text-[#090c0a] px-1.5 py-0.5 font-bold uppercase text-[9px] tracking-wider">
          BULLETIN
        </span>
        <span>
          ACADEMIC CYCLE 1446-1447 AH // ENROLLMENT OPEN WORLDWIDE // NEXT HILAL: MUH 1
        </span>
      </div>

      <div className="flex items-center space-x-4 text-[10px] text-[#9baa90]">
        <span>
          INSTITUTIONAL CODE: <strong className="text-[#d8ddc6]">TWT-CAT-1456</strong>
        </span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline">
          PRAYER SYNC: <strong className="text-[#c5ea31]">MECCA STANDARD TIME</strong>
        </span>
      </div>
    </div>
  );
}
