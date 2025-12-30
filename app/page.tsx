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
      <AboutThisSiteSection />
      <div id="about">
        <AboutMeSection />
      </div>
      <div id="skills">
        <MySkillSection />
      </div>
      <div id="works">
        <WorksSection />
      </div>
      <TimelineSection />
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
