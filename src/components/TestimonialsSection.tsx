import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marathon Runner",
    content: "TenX transformed my running completely. The weekend runs and coaching helped me achieve my first sub-4 hour marathon!",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Fitness Enthusiast",
    content: "The personal training programs are incredible. I've gained 15 lbs of muscle and feel stronger than ever. Best investment in myself!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Beginner Runner",
    content: "I went from couch to 5K with TenX's supportive community. The weekend runs are my favorite part of the week now!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Members Say
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real people who transformed their lives at TenX
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-card)] group"
            >
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
