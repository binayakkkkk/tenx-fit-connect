import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface WeekendRun {
  id: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  participants: number;
}

export const WeekendRunsSection = () => {
  const [upcomingRuns, setUpcomingRuns] = useState<WeekendRun[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("weekendRuns");
    if (stored) {
      setUpcomingRuns(JSON.parse(stored));
    } else {
      // Initialize with default runs
      const defaultRuns = [
        { id: "1", date: "Saturday, Dec 7", time: "6:30 AM", location: "Trinity Bellwoods Park", distance: "5K", participants: 24 },
        { id: "2", date: "Saturday, Dec 14", time: "6:30 AM", location: "High Park", distance: "10K", participants: 18 },
        { id: "3", date: "Saturday, Dec 21", time: "7:00 AM", location: "Waterfront Trail", distance: "8K", participants: 15 },
      ];
      localStorage.setItem("weekendRuns", JSON.stringify(defaultRuns));
      setUpcomingRuns(defaultRuns);
    }
  }, []);

  return (
    <section id="weekend-runs" className="py-20 px-4 bg-gradient-to-br from-card to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Weekend{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Runs
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our community runs every weekend. All paces welcome!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {upcomingRuns.map((run, index) => (
            <Card 
              key={index}
              className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-card)]"
            >
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {run.date}
                </CardTitle>
                <CardDescription className="text-base">{run.distance}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  {run.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {run.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  {run.participants} runners registered
                </div>
                <Link to={`/weekend-runs/register/${run.id}`}>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                  >
                    Register Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Can't make these runs? Check out our full schedule!
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View Full Schedule
          </Button>
        </div>
      </div>
    </section>
  );
};
