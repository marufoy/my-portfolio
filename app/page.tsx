import HeroSection from "@/components/HeroSection";
import AboutMeSection from "@/components/AboutMeSection";
import AboutThisSiteSection from "@/components/AboutThisSiteSection";
import MySkillSection from "@/components/MySkillSection";
import ColumnSection from "@/components/ColumnSection";
import BlogSection from "@/components/BlogSection";
import TimelineSection from "@/components/TimelineSection";
import WorksSection from "@/components/WorksSection";
import ContactSection from "@/components/ContactSection";

/** MicroCMS の一覧・トップ向けデータをこの秒数ごとに再取得（デプロイし直さず更新を反映） */
export const revalidate = 60;

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
