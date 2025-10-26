import { Card, CardContent } from "@/components/ui/card";
import { Target, Trophy, Users, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Active Members",
  },
  {
    icon: Trophy,
    value: "1000+",
    label: "Goals Achieved",
  },
  {
    icon: Zap,
    value: "50+",
    label: "Weekly Classes",
  },
  {
    icon: Target,
    value: "10x",
    label: "Results Guaranteed",
  },
];

export const CommunitySection = () => {
  return (
    <section id="community" className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join the{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Movement
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            TenX is more than a gym—it's a community of driven individuals pushing each other to achieve extraordinary results.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index}
                className="bg-card border-border text-center hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-card)] group"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl text-foreground italic mb-4">
            "TenX transformed not just my body, but my entire mindset. The community here is unmatched."
          </blockquote>
          <p className="text-muted-foreground">— Sarah M., TenX Member since 2023</p>
        </div>
      </div>
    </section>
  );
};
