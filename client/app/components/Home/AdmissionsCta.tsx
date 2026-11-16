import Link from "next/link";

export default function AdmissionsCta() {
  return (
    <section className="bg-[#faf8f5] p-6 md:p-12 border-b border-[#e6e0d4]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#166236] rounded-3xl p-8 sm:p-12 md:p-14 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 shadow-xs text-white relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Text Left */}
          <div className="max-w-2xl relative z-10">
            <div className="bg-white/15 text-white font-sans text-xs font-semibold uppercase px-4 py-1.5 inline-block mb-4 rounded-full backdrop-blur-xs">
              Admissions Open • Flexible Scheduling
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              Begin Your Learning Journey with Addinu Yusr
            </h2>
            <p className="font-sans text-xs sm:text-base text-emerald-100 leading-relaxed">
              Whether you are taking your first steps in learning to read the Qur&apos;an or seeking to refine your Tajweed and Arabic grammar, our certified teachers are here to guide you with patience and dedication.
            </p>
          </div>

          {/* Action Buttons Right */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[260px] relative z-10">
            <Link
              href="/courses"
              className="bg-white text-[#166236] rounded-2xl py-4 px-8 font-sans font-bold text-sm tracking-wide hover:bg-stone-50 transition-all text-center shadow-xs hover:shadow-md cursor-pointer"
            >
              Browse All Courses
            </Link>
            <Link
              href="/login"
              className="bg-white/10 text-white border border-white/25 rounded-2xl py-3.5 px-6 font-sans font-semibold text-xs tracking-wide hover:bg-white/20 transition-all text-center backdrop-blur-xs cursor-pointer"
            >
              Access Student Portal →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}