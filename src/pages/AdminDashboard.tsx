import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { EnrollmentsTab } from "@/components/admin/EnrollmentsTab";
import { WeekendRunsTab } from "@/components/admin/WeekendRunsTab";
import { WeekendRunRegistrationsTab } from "@/components/admin/WeekendRunRegistrationsTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = localStorage.getItem("adminAuthenticated");
    if (authenticated !== "true") {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">TenX Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="enrollments">Program Enrollments</TabsTrigger>
            <TabsTrigger value="runs">Weekend Runs</TabsTrigger>
            <TabsTrigger value="run-registrations">Run Registrations</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments">
            <EnrollmentsTab />
          </TabsContent>

          <TabsContent value="runs">
            <WeekendRunsTab />
          </TabsContent>

          <TabsContent value="run-registrations">
            <WeekendRunRegistrationsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
