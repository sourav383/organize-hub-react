import { CalendarDays, CheckSquare, Mail, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Overview", icon: BarChart3, current: true },
  { name: "Tasks", icon: CheckSquare, current: false },
  { name: "Email", icon: Mail, current: false },
  { name: "Events", icon: CalendarDays, current: false },
  { name: "Settings", icon: Settings, current: false },
];

export const Sidebar = () => {
  return (
    <div className="flex w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground">EventDash</h1>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant={item.current ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.name}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-primary"></div>
          <div>
            <p className="text-sm font-medium text-foreground">Event Organizer</p>
            <p className="text-xs text-muted-foreground">admin@event.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};