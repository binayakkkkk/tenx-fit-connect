import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Heart, Footprints, User } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    icon: Dumbbell,
    title: "Workout & Mobility",
    slug: "workout-mobility",
    description: "Build strength and flexibility with our comprehensive training programs designed for all fitness levels.",
    features: ["Strength Training", "Flexibility Work", "Recovery Sessions", "Expert Coaching"],
  },
  {
    icon: Footprints,
    title: "Running Programs",
    slug: "running",
    description: "From beginners to marathoners, improve your running performance with structured training plans.",
    features: ["5K to Marathon Prep", "Speed Work", "Endurance Building", "Running Form Analysis"],
  },
  {
    icon: User,
    title: "Personal Training",
    slug: "personal-training",
    description: "Get one-on-one attention with customized workout plans tailored to your specific goals.",
    features: ["Custom Programs", "1-on-1 Coaching", "Progress Tracking", "Nutrition Guidance"],
  },
];

export const ProgramsSection = () => {
  return (
    <section id="programs" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Path
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the programs that align with your fitness goals and join a community committed to growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card 
                key={index}
                className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-card)] group"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Heart className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/programs/${program.slug}`}>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
