"use client";

import { useState, useEffect, useRef } from "react";

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const directCallNumber = "+966 50 478 1226";
  const directCallTel = "tel:+966504781226";
  const whatsappNumber = "+91 8171432372";
  const whatsappCleanNumber = "918171432372";
  const channelUrl = "https://whatsapp.com/channel/0029VbAuHQYGZND0ODsmGm1O";
  const defaultMessage = encodeURIComponent(
    "Assalamu Alaikum, I would like to inquire about Addinu Yusr Institute courses and admissions."
  );
  const directChatUrl = `https://wa.me/${whatsappCleanNumber}?text=${defaultMessage}`;

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Gentle callout preview on initial load (shown once after 2.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end font-sans select-none"
    >
      {/* Floating Action Menu / Popup Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp options"
          className="mb-3 w-[330px] sm:w-[360px] max-w-[calc(100vw-2.5rem)] bg-white rounded-3xl shadow-2xl border border-[#e6e0d4] overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95 origin-bottom-right"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366] p-4 sm:p-5 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center p-2">
                  <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-full h-full text-white"
                  >
                    <path d="M16 2a13.93 13.93 0 0 0-12.06 20.9L2 30l7.32-1.92A13.94 13.94 0 1 0 16 2zm0 25.54a11.53 11.53 0 0 1-5.88-1.61l-.42-.25-4.36 1.14 1.16-4.25-.27-.44A11.56 11.56 0 1 1 16 27.54zm6.34-8.68c-.35-.17-2.07-1-2.39-1.12s-.56-.17-.8.17-.92 1.12-1.13 1.35-.42.26-.77.09a9.7 9.7 0 0 1-2.86-1.76 10.7 10.7 0 0 1-1.98-2.47c-.2-.35 0-.54.16-.71s.35-.41.53-.61a2.38 2.38 0 0 0 .35-.59.65.65 0 0 0 0-.62c-.09-.17-.8-1.92-1.1-2.63s-.59-.6-.8-.61h-.69a1.32 1.32 0 0 0-1 .45 4 4 0 0 0-1.25 3 7 7 0 0 0 1.47 3.73 16.08 16.08 0 0 0 6.16 5.45c2.46 1.07 3 .86 3.5.8s1.69-.69 1.93-1.36.24-1.24.17-1.36-.26-.2-.61-.37z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight text-white font-serif">
                    Addinu Yusr Institute
                  </h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></span>
                    <span className="text-[11px] text-emerald-50 font-medium">
                      Official WhatsApp Support
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white text-sm transition-colors cursor-pointer"
                aria-label="Close WhatsApp options"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-white/90 mt-3 font-sans leading-relaxed">
              Assalamu Alaikum! How can we assist you with our Islamic curricula and admissions today?
            </p>
          </div>

          {/* Action Options */}
          <div className="p-4 space-y-3 bg-[#faf8f5]">
            {/* Option 1: Direct Phone Call */}
            <a
              href={directCallTel}
              className="group block p-3.5 bg-white rounded-2xl border border-[#e6e0d4] hover:border-[#166236] hover:shadow-md transition-all duration-150"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#166236] group-hover:bg-[#166236] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-[#14241c] group-hover:text-[#166236] transition-colors">
                      Direct Phone Call
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      Direct Line
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#166236] mt-0.5">
                    {directCallNumber}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                    Call our institute directly for instant support & admissions guidance.
                  </p>
                </div>
              </div>
            </a>

            {/* Option 2: Direct WhatsApp Chat */}
            <a
              href={directChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3.5 bg-white rounded-2xl border border-[#e6e0d4] hover:border-[#25D366] hover:shadow-md transition-all duration-150"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#166236] group-hover:bg-[#25D366] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z" />
                    <circle cx="8" cy="10" r="1.5" />
                    <circle cx="12" cy="10" r="1.5" />
                    <circle cx="16" cy="10" r="1.5" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-[#14241c] group-hover:text-[#166236] transition-colors">
                      Chat on WhatsApp
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      Direct Support
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#166236] mt-0.5">
                    {whatsappNumber}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                    Message us for admissions, course fees & teacher consultations.
                  </p>
                </div>
              </div>
            </a>

            {/* Option 3: WhatsApp Channel / Community */}
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3.5 bg-white rounded-2xl border border-[#e6e0d4] hover:border-[#128C7E] hover:shadow-md transition-all duration-150"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#128C7E] group-hover:bg-[#128C7E] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-[#14241c] group-hover:text-[#128C7E] transition-colors">
                      Join WhatsApp Channel
                    </span>
                    <span className="text-[10px] font-semibold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-full">
                      Community
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                    Follow for daily Qur&apos;an verses, lectures, live classes & institute announcements.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 bg-[#f4efe6] border-t border-[#e6e0d4] flex items-center justify-between text-[10px] text-gray-500">
            <span>Official Portal Communication</span>
            <span className="font-semibold text-[#166236]">Addinu Yusr</span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button Row */}
      <div className="flex items-center space-x-2">
        {/* Helper preview bubble shown initially or on hover */}
        {!isOpen && hasPrompted && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hidden sm:flex items-center space-x-2 bg-white/95 backdrop-blur-md text-[#14241c] px-3.5 py-2 rounded-2xl shadow-lg border border-[#e6e0d4] text-xs font-medium hover:border-[#25D366] transition-all duration-200 animate-in fade-in slide-in-from-right-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>Need Help? <strong>Call & WhatsApp</strong></span>
          </div>
        )}

        {/* Main Floating WhatsApp Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close WhatsApp menu" : "Open WhatsApp chat and community options"}
          className={`relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-emerald-300 ${
            isOpen
              ? "bg-[#14241c] rotate-90"
              : "bg-[#25D366] hover:bg-[#20ba5a] active:scale-95"
          }`}
        >
          {/* Subtle pulse ring behind button when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"></span>
          )}

          {isOpen ? (
            <svg
              className="w-6 h-6 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 32 32"
              fill="currentColor"
              className="w-8 h-8 sm:w-9 sm:h-9"
            >
              <path d="M16 2a13.93 13.93 0 0 0-12.06 20.9L2 30l7.32-1.92A13.94 13.94 0 1 0 16 2zm0 25.54a11.53 11.53 0 0 1-5.88-1.61l-.42-.25-4.36 1.14 1.16-4.25-.27-.44A11.56 11.56 0 1 1 16 27.54zm6.34-8.68c-.35-.17-2.07-1-2.39-1.12s-.56-.17-.8.17-.92 1.12-1.13 1.35-.42.26-.77.09a9.7 9.7 0 0 1-2.86-1.76 10.7 10.7 0 0 1-1.98-2.47c-.2-.35 0-.54.16-.71s.35-.41.53-.61a2.38 2.38 0 0 0 .35-.59.65.65 0 0 0 0-.62c-.09-.17-.8-1.92-1.1-2.63s-.59-.6-.8-.61h-.69a1.32 1.32 0 0 0-1 .45 4 4 0 0 0-1.25 3 7 7 0 0 0 1.47 3.73 16.08 16.08 0 0 0 6.16 5.45c2.46 1.07 3 .86 3.5.8s1.69-.69 1.93-1.36.24-1.24.17-1.36-.26-.2-.61-.37z" />
            </svg>
          )}

          {/* Online green indicator badge on button */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-700 border-2 border-white rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
