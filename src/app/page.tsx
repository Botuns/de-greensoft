import HeroSection from "@/components/blocks/hero-section";
import LandingPageSections from "@/components/Sections";

export default function Home() {
  return (
    <div>
      <div className="mx-4 md:mx-20">
        <div className=" max-sm:mt-16">
          <HeroSection />
        </div>
        <LandingPageSections />
      </div>
    </div>
  );
}
