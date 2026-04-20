import HeroSection from "@/components/HeroSection";
import AboutMeSection from "@/components/AboutMeSection";
import AboutThisSiteSection from "@/components/AboutThisSiteSection";
import MySkillSection from "@/components/MySkillSection";
import ColumnSection from "@/components/ColumnSection";
import BlogSection from "@/components/BlogSection";
import TimelineSection from "@/components/TimelineSection";
import WorksSection from "@/components/WorksSection";
import ContactSection from "@/components/ContactSection";

/** TOP の Blog 一覧などを常に最新に（ISR の古い HTML を返さない） */
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutThisSiteSection />
      <div id="about">
        <AboutMeSection />
      </div>
      <div id="works">
        <WorksSection />
      <div id="skills">
        <MySkillSection />
      </div>
      </div>
      <div id="columns">
        <ColumnSection />
      </div>
      <div id="blog">
        <BlogSection />
      </div>
      <TimelineSection />
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
