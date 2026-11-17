export default function TopBanner() {
  const noticeText = "Academic Term 1446-1447 AH • New Enrollments Open Worldwide • Live Group Cohorts Available";
  const portalText = "Portal: Addinu Yusr Online";
  const liveText = "Live Instruction: Google Meet & Zoom";
  const phoneText = "+966 50 478 1226";
  const phoneTel = "tel:+966504781226";

  return (
    <div className="bg-[#14241c] text-emerald-100/90 text-xs font-sans border-b border-[#14241c]/30">
      {/* Small Devices: Smooth Continuous Marquee (< sm) */}
      <div className="sm:hidden flex items-center h-9 px-3 overflow-hidden relative">
       

        {/* Marquee Track with Fade Masks */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8px,black_calc(100%-10px),transparent)]">
          <div className="flex w-max animate-marquee-smooth space-x-6 items-center text-[11px] select-none">
            {/* Loop Item 1 */}
            <div className="flex items-center space-x-3 shrink-0">
              <span className="text-emerald-50 font-medium">{noticeText}</span>
              <span className="text-emerald-700">•</span>
              <a
                href={phoneTel}
                className="inline-flex items-center space-x-1 text-emerald-200 hover:text-white underline decoration-emerald-400 font-bold"
              >
                <span> Direct Call: {phoneText}</span>
              </a>
              <span className="text-emerald-700">•</span>
              <span className="text-emerald-200/80">{portalText} • {liveText}</span>
            </div>

            {/* Loop Item 2 (Identical for seamless infinite scroll) */}
            <div className="flex items-center space-x-3 shrink-0" aria-hidden="true">
              <span className="text-emerald-50 font-medium">{noticeText}</span>
              <span className="text-emerald-700">•</span>
              <a
                href={phoneTel}
                className="inline-flex items-center space-x-1 text-emerald-200 hover:text-white underline decoration-emerald-400 font-bold"
              >
                <span> Direct Call: {phoneText}</span>
              </a>
              <span className="text-emerald-700">•</span>
              <span className="text-emerald-200/80">{portalText} • {liveText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop & Tablet: Static Structured Strip (>= sm) */}
      <div className="hidden sm:flex py-2 px-4 justify-between items-center gap-2">
        <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
         
          <span className="text-emerald-50 text-[11px] font-medium">
            {noticeText}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] text-emerald-200/80 shrink-0">
          <span>
            Portal: <strong className="text-white font-medium">Addinu Yusr Online</strong>
          </span>
          <span className="text-emerald-800">|</span>
          <span>
            Live Instruction: <strong className="text-emerald-300 font-medium">Google Meet & Zoom</strong>
          </span>
          <span className="text-emerald-800">|</span>
          <a
            href={phoneTel}
            className="inline-flex items-center space-x-1.5 text-emerald-200 hover:text-white transition-colors font-medium group"
            title="Direct Phone Call"
          >
            <svg className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
            </svg>
            <span>Direct Call:</span>
            <strong className="text-white underline decoration-emerald-500/60 font-semibold">{phoneText}</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
