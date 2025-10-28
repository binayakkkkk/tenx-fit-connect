import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProgramsSection } from "@/components/ProgramsSection";
import { WeekendRunsSection } from "@/components/WeekendRunsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import { UpcomingRunPopup } from "@/components/UpcomingRunPopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProgramsSection />
      <WeekendRunsSection />
      <CommunitySection />
      <TestimonialsSection />
      <Footer />
      <UpcomingRunPopup />
    </div>
  );
};

export default Index;
