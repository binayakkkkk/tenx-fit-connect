import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WeekendRunDialog } from "./WeekendRunDialog";

export interface WeekendRun {
  id: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  participants: number;
}

export const WeekendRunsTab = () => {
  const [runs, setRuns] = useState<WeekendRun[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRun, setEditingRun] = useState<WeekendRun | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadRuns();
  }, []);

  const loadRuns = () => {
    const stored = localStorage.getItem("weekendRuns");
    if (stored) {
      setRuns(JSON.parse(stored));
    } else {
      // Initialize with default runs
      const defaultRuns: WeekendRun[] = [
        { id: "1", date: "Saturday, Dec 7", time: "6:30 AM", location: "Trinity Bellwoods Park", distance: "5K", participants: 24 },
        { id: "2", date: "Saturday, Dec 14", time: "6:30 AM", location: "High Park", distance: "10K", participants: 18 },
        { id: "3", date: "Saturday, Dec 21", time: "7:00 AM", location: "Waterfront Trail", distance: "8K", participants: 15 },
      ];
      localStorage.setItem("weekendRuns", JSON.stringify(defaultRuns));
      setRuns(defaultRuns);
    }
  };

  const deleteRun = (id: string) => {
    const updated = runs.filter(r => r.id !== id);
    localStorage.setItem("weekendRuns", JSON.stringify(updated));
    setRuns(updated);
    toast({
      title: "Run deleted",
      description: "The weekend run has been removed successfully",
    });
  };

  const handleEdit = (run: WeekendRun) => {
    setEditingRun(run);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingRun(null);
    setDialogOpen(true);
  };

  const handleSave = (run: WeekendRun) => {
    let updated: WeekendRun[];
    if (editingRun) {
      updated = runs.map(r => r.id === run.id ? run : r);
    } else {
      updated = [...runs, { ...run, id: Date.now().toString() }];
    }
    localStorage.setItem("weekendRuns", JSON.stringify(updated));
    setRuns(updated);
    setDialogOpen(false);
    toast({
      title: editingRun ? "Run updated" : "Run added",
      description: `Weekend run has been ${editingRun ? "updated" : "added"} successfully`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Weekend Runs Management</CardTitle>
          <CardDescription>Add, edit, or remove weekend running events</CardDescription>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Run
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runs.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">{run.date}</TableCell>
                  <TableCell>{run.time}</TableCell>
                  <TableCell>{run.location}</TableCell>
                  <TableCell>{run.distance}</TableCell>
                  <TableCell>{run.participants}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(run)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRun(run.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <WeekendRunDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          run={editingRun}
          onSave={handleSave}
        />
      </CardContent>
    </Card>
  );
};
