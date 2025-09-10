import { DashboardLayout } from "@/components/DashboardLayout";
import { OverviewCards } from "@/components/OverviewCards";
import { TaskList } from "@/components/TaskList";
import { EmailPanel } from "@/components/EmailPanel";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CalendarDays className="h-8 w-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Event Organizer</h1>
          </div>
          <p className="text-white/80 mb-8 max-w-md">
            The complete solution for managing your events, tasks, and team communication
          </p>
          <Button asChild size="lg">
            <a href="/auth">Get Started</a>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Dashboard</h1>
          <p className="text-muted-foreground">Manage your event tasks and communicate with attendees</p>
        </div>
        
        <OverviewCards />
        
        <div className="grid gap-6 lg:grid-cols-2">
          <TaskList />
          <EmailPanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
