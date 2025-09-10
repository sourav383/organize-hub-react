import { DashboardLayout } from "@/components/DashboardLayout";
import { OverviewCards } from "@/components/OverviewCards";
import { TaskList } from "@/components/TaskList";
import { EmailPanel } from "@/components/EmailPanel";

const Index = () => {
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
