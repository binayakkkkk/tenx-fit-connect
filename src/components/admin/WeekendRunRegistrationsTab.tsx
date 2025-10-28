import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RunRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  experienceLevel: string;
  runId: string;
  runDetails?: {
    date: string;
    time: string;
    location: string;
    distance: string;
  };
  timestamp: string;
}

export const WeekendRunRegistrationsTab = () => {
  const [registrations, setRegistrations] = useState<RunRegistration[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = () => {
    const stored = localStorage.getItem("weekendRunRegistrations");
    if (stored) {
      setRegistrations(JSON.parse(stored));
    }
  };

  const deleteRegistration = (id: string) => {
    const updated = registrations.filter(r => r.id !== id);
    localStorage.setItem("weekendRunRegistrations", JSON.stringify(updated));
    setRegistrations(updated);
    toast({
      title: "Registration deleted",
      description: "The registration has been removed successfully",
    });
  };

  // Group registrations by run
  const groupedRegistrations = registrations.reduce((acc, registration) => {
    const runKey = registration.runDetails 
      ? `${registration.runDetails.distance} - ${registration.runDetails.date}`
      : "Unknown Run";
    if (!acc[runKey]) {
      acc[runKey] = [];
    }
    acc[runKey].push(registration);
    return acc;
  }, {} as Record<string, RunRegistration[]>);

  const runs = Object.keys(groupedRegistrations);

  return (
    <div className="space-y-6">
      {registrations.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No weekend run registrations yet</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        runs.map((runName) => (
          <Card key={runName}>
            <CardHeader>
              <CardTitle>{runName}</CardTitle>
              <CardDescription>
                {groupedRegistrations[runName].length} registration{groupedRegistrations[runName].length !== 1 ? 's' : ''}
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
                      <TableHead>Emergency Contact</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedRegistrations[runName].map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">{registration.name}</TableCell>
                        <TableCell>{registration.email}</TableCell>
                        <TableCell>{registration.phone}</TableCell>
                        <TableCell>{registration.emergencyContact}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {registration.experienceLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteRegistration(registration.id)}
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
