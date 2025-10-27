import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProgramsSection } from "@/components/ProgramsSection";
import { WeekendRunsSection } from "@/components/WeekendRunsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { UpcomingRunPopup } from "@/components/UpcomingRunPopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProgramsSection />
      <WeekendRunsSection />
      <CommunitySection />
      <UpcomingRunPopup />
    </div>
  );
};

export default Index;
