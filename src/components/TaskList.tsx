import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
  category: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Book venue decorations",
    description: "Contact florist and arrange centerpieces",
    completed: false,
    priority: "high",
    dueDate: "2024-01-15",
    category: "Venue",
  },
  {
    id: "2",
    title: "Send welcome emails to attendees",
    description: "Draft and send welcome message with event details",
    completed: true,
    priority: "medium",
    dueDate: "2024-01-10",
    category: "Communication",
  },
  {
    id: "3",
    title: "Confirm catering menu",
    description: "Finalize dietary requirements and menu options",
    completed: false,
    priority: "high",
    dueDate: "2024-01-12",
    category: "Catering",
  },
  {
    id: "4",
    title: "Set up registration desk",
    description: "Prepare check-in materials and name badges",
    completed: false,
    priority: "medium",
    dueDate: "2024-01-20",
    category: "Registration",
  },
  {
    id: "5",
    title: "Test AV equipment",
    description: "Check microphones, projectors, and sound system",
    completed: false,
    priority: "low",
    dueDate: "2024-01-18",
    category: "Technical",
  },
];

const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-success text-success-foreground",
};

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: "",
        completed: false,
        priority: "medium",
        dueDate: new Date().toISOString().split('T')[0],
        category: "General",
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Event Tasks</CardTitle>
          <Badge variant="secondary">
            {completedTasks}/{totalTasks} completed
          </Badge>
        </div>
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Add new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1"
          />
          <Button onClick={addTask} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
              task.completed ? 'bg-muted/50 opacity-75' : 'bg-card hover:shadow-md'
            }`}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-0.5"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {task.category}
                  </Badge>
                  <Badge className={`text-xs ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </Badge>
                </div>
              </div>
              {task.description && (
                <p className={`text-sm ${task.completed ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                {new Date(task.dueDate) < new Date() && !task.completed && (
                  <div className="flex items-center gap-1 text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span>Overdue</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};