import TopBanner from "@/app/components/Home/TopBanner";
import Header from "@/app/components/Home/Header";
import Hero from "@/app/components/Home/Hero";
import StatsStrip from "@/app/components/Home/StatsStrip";
import CoursePathways from "@/app/components/Home/CoursePathways";
import LearningFacts from "@/app/components/Home/LearningFacts";
import DailyVerse from "@/app/components/Home/DailyVerse";
import AdmissionsCta from "@/app/components/Home/AdmissionsCta";
import Footer from "@/app/components/Home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#14241c] font-sans antialiased selection:bg-[#166236] selection:text-white flex flex-col">
      {/* Top Academic Notice Banner */}
      <TopBanner />

      {/* Main Header / Navigation with Logo & Mobile Drawer */}
      <Header />

      {/* Hero Section with Mosque Background & Institutional Typography */}
      <Hero />

      {/* Key Academic Pillars & Statistics */}
      <StatsStrip />

      {/* Institutional Course Pathways */}
      <CoursePathways />

      {/* Educational Methodology, Curriculum Topics & FAQs */}
      <LearningFacts />

      {/* Scriptural Canon & Daily Reflection */}
      <DailyVerse />

      {/* Admissions Call to Action */}
      <AdmissionsCta />

      {/* Academic Footer */}
      <Footer />
    </div>
  );
}