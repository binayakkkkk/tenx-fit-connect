import { Hero } from "@/components/Hero";
import { ProgramsSection } from "@/components/ProgramsSection";
import { WeekendRunsSection } from "@/components/WeekendRunsSection";
import { CommunitySection } from "@/components/CommunitySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProgramsSection />
      <WeekendRunsSection />
      <CommunitySection />
    </div>
  );
};

export default Index;
