import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  due_date: string;
  category: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}


const priorityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-success text-success-foreground",
};

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks((data || []) as Task[]);
    } catch (error: any) {
      toast({
        title: "Error fetching tasks",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', id);

      if (error) throw error;

      setTasks(tasks.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ));

      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed!",
        description: `"${task.title}" has been updated.`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim() || !user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title: newTaskTitle,
            description: "",
            completed: false,
            priority: "medium",
            due_date: new Date().toISOString().split('T')[0],
            category: "General",
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setTasks([data as Task, ...tasks]);
      setNewTaskTitle("");

      toast({
        title: "Task added",
        description: `"${newTaskTitle}" has been added to your task list.`,
      });
    } catch (error: any) {
      toast({
        title: "Error adding task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading tasks...</div>
        </CardContent>
      </Card>
    );
  }

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
                <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                {new Date(task.due_date) < new Date() && !task.completed && (
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