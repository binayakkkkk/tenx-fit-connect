import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { WeekendRun } from "./WeekendRunsTab";

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  distance: z.string().min(1, "Distance is required"),
  participants: z.string().min(1, "Participants is required"),
});

interface WeekendRunDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  run: WeekendRun | null;
  onSave: (run: WeekendRun) => void;
}

export const WeekendRunDialog = ({ open, onOpenChange, run, onSave }: WeekendRunDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      time: "",
      location: "",
      distance: "",
      participants: "0",
    },
  });

  useEffect(() => {
    if (run) {
      form.reset({
        date: run.date,
        time: run.time,
        location: run.location,
        distance: run.distance,
        participants: run.participants.toString(),
      });
    } else {
      form.reset({
        date: "",
        time: "",
        location: "",
        distance: "",
        participants: "0",
      });
    }
  }, [run, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSave({
      id: run?.id || "",
      date: data.date,
      time: data.time,
      location: data.location,
      distance: data.distance,
      participants: parseInt(data.participants),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{run ? "Edit Weekend Run" : "Add Weekend Run"}</DialogTitle>
          <DialogDescription>
            {run ? "Update the details of the weekend run" : "Add a new weekend run event"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Saturday, Dec 7" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="6:30 AM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Trinity Bellwoods Park" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance</FormLabel>
                  <FormControl>
                    <Input placeholder="5K" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Participants</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
