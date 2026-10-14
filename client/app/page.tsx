import Header from "@/app/components/Home/Header";
import Hero from "@/app/components/Home/Hero";
// import CoursePathways from "@/app/components/Home/CoursePathways";
import Footer from "@/app/components/Home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#d8ddc6] text-[#090c0a] font-sans antialiased selection:bg-[#c5ea31] selection:text-[#090c0a] flex flex-col">
      {/* Main Header / Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Course Pathways (7 Official Addinu Yusr Courses) */}
      {/* <CoursePathways /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}