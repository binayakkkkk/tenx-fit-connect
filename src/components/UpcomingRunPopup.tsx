import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, X } from "lucide-react";
import { Link } from "react-router-dom";

interface WeekendRun {
  id: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  participants: number;
}

export const UpcomingRunPopup = () => {
  const [open, setOpen] = useState(false);
  const [nextRun, setNextRun] = useState<WeekendRun | null>(null);

  useEffect(() => {
    // Check if user has dismissed the popup in this session
    const dismissed = sessionStorage.getItem("runPopupDismissed");
    if (dismissed) return;

    // Load runs from localStorage
    const stored = localStorage.getItem("weekendRuns");
    if (stored) {
      const runs = JSON.parse(stored);
      if (runs.length > 0) {
        setNextRun(runs[0]); // Get the first upcoming run
        // Show popup after a short delay
        setTimeout(() => setOpen(true), 1000);
      }
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("runPopupDismissed", "true");
  };

  if (!nextRun) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-primary/20 animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="h-6 w-6 text-primary" />
            Upcoming Weekend Run! 🏃‍♂️
          </DialogTitle>
          <DialogDescription className="text-base">
            Join our community for the next run
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 text-foreground">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="font-semibold">{nextRun.date}</span>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              <span>{nextRun.time}</span>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
              <span>{nextRun.location}</span>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <Users className="h-5 w-5 text-primary flex-shrink-0" />
              <span>{nextRun.participants} runners registered</span>
            </div>
            
            <div className="pt-2 border-t border-border">
              <p className="text-lg font-bold text-primary">{nextRun.distance}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={`/weekend-runs/register/${nextRun.id}`} className="flex-1">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                onClick={handleClose}
              >
                Register Now
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-border hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
