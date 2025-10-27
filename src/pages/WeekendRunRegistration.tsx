import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";

interface WeekendRun {
  id: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  participants: number;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(20),
  emergencyContact: z.string().min(10, "Emergency contact must be at least 10 characters").max(100),
  experienceLevel: z.string().min(1, "Please select your experience level"),
});

type FormData = z.infer<typeof formSchema>;

const WeekendRunRegistration = () => {
  const { runId } = useParams<{ runId: string }>();
  const [runs, setRuns] = useState<WeekendRun[]>([]);
  const [run, setRun] = useState<WeekendRun | undefined>();

  useEffect(() => {
    const stored = localStorage.getItem("weekendRuns");
    if (stored) {
      const parsedRuns = JSON.parse(stored);
      setRuns(parsedRuns);
      setRun(parsedRuns.find((r: WeekendRun) => r.id === runId));
    }
  }, [runId]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      emergencyContact: "",
      experienceLevel: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // Save to localStorage
    const registrations = JSON.parse(localStorage.getItem("weekendRunRegistrations") || "[]");
    const newRegistration = {
      id: Date.now().toString(),
      ...data,
      runId,
      runDetails: run,
      timestamp: new Date().toISOString(),
    };
    registrations.push(newRegistration);
    localStorage.setItem("weekendRunRegistrations", JSON.stringify(registrations));
    
    toast.success("Registration Successful!", {
      description: `You're registered for the ${run?.distance} on ${run?.date}. See you there!`,
    });
    
    form.reset();
  };

  if (!run) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Run Not Found</h1>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-8 text-center">
            Register for{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Weekend Run
            </span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Run Details */}
            <Card className="bg-card border-border h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">{run.distance}</CardTitle>
                <CardDescription className="text-base">{run.date}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-foreground">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  {run.time}
                </div>
                <div className="flex items-center text-foreground">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  {run.location}
                </div>
                <div className="flex items-center text-foreground">
                  <Users className="h-5 w-5 mr-3 text-primary" />
                  {run.participants} runners registered
                </div>
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-2">What to Bring:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Running shoes</li>
                    <li>• Water bottle</li>
                    <li>• Weather-appropriate clothing</li>
                    <li>• Positive attitude!</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Registration Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Registration Details</CardTitle>
                <CardDescription>
                  Fill out the information below to secure your spot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="Name and phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Running Experience</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                      size="lg"
                    >
                      Complete Registration
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeekendRunRegistration;
