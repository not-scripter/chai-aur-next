import FeaturedCourses from "@/components/FeaturedCourses";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen antialiased bg-black/[96] bg-grid-white/[0.2]">
      <HeroSection />
      <FeaturedCourses />
    </main>
  );
}
