import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Mail } from "lucide-react";

const stats = [
  {
    title: "Total Tasks",
    value: "24",
    icon: CheckCircle,
    description: "8 completed",
    trend: "+2 from yesterday",
    color: "text-success",
  },
  {
    title: "Pending Tasks",
    value: "16",
    icon: Clock,
    description: "Due this week",
    trend: "3 overdue",
    color: "text-warning",
  },
  {
    title: "Attendees",
    value: "342",
    icon: Users,
    description: "Registered",
    trend: "+12 today",
    color: "text-info",
  },
  {
    title: "Emails Sent",
    value: "28",
    icon: Mail,
    description: "This week",
    trend: "94% open rate",
    color: "text-primary",
  },
];

export const OverviewCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
              <p className="text-xs text-success mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};