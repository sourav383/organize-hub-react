import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, signOut } = useAuth();
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-foreground">Event Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => signOut()}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};