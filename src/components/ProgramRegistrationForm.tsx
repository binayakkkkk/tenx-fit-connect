import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Program } from "@/data/programs";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(20),
  selectedTier: z.string().min(1, "Please select a membership tier"),
  preferredStartDate: z.string().min(1, "Please select a start date"),
  goals: z.string().max(500, "Goals must be less than 500 characters").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ProgramRegistrationFormProps {
  program: Program;
}

export const ProgramRegistrationForm = ({ program }: ProgramRegistrationFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      selectedTier: "",
      preferredStartDate: "",
      goals: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // Save to localStorage
    const enrollments = JSON.parse(localStorage.getItem("programEnrollments") || "[]");
    const newEnrollment = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      tier: data.selectedTier, // Map to 'tier' for admin panel
      startDate: data.preferredStartDate, // Map to 'startDate' for admin panel
      goals: data.goals,
      program: program.title,
      timestamp: new Date().toISOString(),
    };
    enrollments.push(newEnrollment);
    localStorage.setItem("programEnrollments", JSON.stringify(enrollments));
    
    toast.success("Registration Submitted!", {
      description: `We'll contact you shortly at ${data.email} to complete your enrollment.`,
    });
    
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          name="selectedTier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Tier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a membership tier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {program.pricing.map((tier) => (
                    <SelectItem key={tier.tier} value={tier.tier}>
                      {tier.tier} - {tier.price}/{tier.period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Fitness Goals (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what you want to achieve..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)] transition-all duration-300"
          size="lg"
        >
          Submit Registration
        </Button>
      </form>
    </Form>
  );
};
