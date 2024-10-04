import HeroSection from "@/components/blocks/hero-section";
import LandingPageSections from "@/components/Sections";

export default function Home() {
  return (
    <div>
      <div className="mx-4 md:mx-20">
        <HeroSection />
        <LandingPageSections />
      </div>
    </div>
  );
}
