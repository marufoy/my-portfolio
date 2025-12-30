import HeroSection from "@/components/HeroSection";
import AboutMeSection from "@/components/AboutMeSection";
import AboutThisSiteSection from "@/components/AboutThisSiteSection";
import MySkillSection from "@/components/MySkillSection";
import TimelineSection from "@/components/TimelineSection";
import WorksSection from "@/components/WorksSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <AboutThisSiteSection />
      <MySkillSection />
      <TimelineSection />
      <WorksSection />
      <ContactSection />
    </>
  );
}
