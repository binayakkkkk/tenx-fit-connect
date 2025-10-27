import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  tier: string;
  startDate: string;
  goals?: string;
  timestamp: string;
}

export const EnrollmentsTab = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = () => {
    const stored = localStorage.getItem("programEnrollments");
    if (stored) {
      setEnrollments(JSON.parse(stored));
    }
  };

  const deleteEnrollment = (id: string) => {
    const updated = enrollments.filter(e => e.id !== id);
    localStorage.setItem("programEnrollments", JSON.stringify(updated));
    setEnrollments(updated);
    toast({
      title: "Enrollment deleted",
      description: "The enrollment has been removed successfully",
    });
  };

  // Group enrollments by program
  const groupedEnrollments = enrollments.reduce((acc, enrollment) => {
    if (!acc[enrollment.program]) {
      acc[enrollment.program] = [];
    }
    acc[enrollment.program].push(enrollment);
    return acc;
  }, {} as Record<string, Enrollment[]>);

  const programs = Object.keys(groupedEnrollments);

  return (
    <div className="space-y-6">
      {enrollments.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No enrollments yet</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        programs.map((programName) => (
          <Card key={programName}>
            <CardHeader>
              <CardTitle>{programName}</CardTitle>
              <CardDescription>
                {groupedEnrollments[programName].length} enrollment{groupedEnrollments[programName].length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedEnrollments[programName].map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-medium">{enrollment.name}</TableCell>
                        <TableCell>{enrollment.email}</TableCell>
                        <TableCell>{enrollment.phone}</TableCell>
                        <TableCell>{enrollment.tier}</TableCell>
                        <TableCell>{enrollment.startDate}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteEnrollment(enrollment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
