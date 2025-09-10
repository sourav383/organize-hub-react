import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Users, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emailTemplates = [
  { id: "welcome", name: "Welcome Message", subject: "Welcome to our Event!" },
  { id: "reminder", name: "Event Reminder", subject: "Don't forget - Event Tomorrow!" },
  { id: "update", name: "Event Update", subject: "Important Event Update" },
  { id: "thank-you", name: "Thank You", subject: "Thank you for attending!" },
];

const attendeeGroups = [
  { id: "all", name: "All Attendees", count: 342 },
  { id: "vip", name: "VIP Guests", count: 25 },
  { id: "speakers", name: "Speakers", count: 8 },
  { id: "sponsors", name: "Sponsors", count: 12 },
  { id: "unconfirmed", name: "Unconfirmed", count: 45 },
];

export const EmailPanel = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      // Set default message based on template
      const defaultMessages = {
        welcome: "Welcome to our upcoming event! We're excited to have you join us. Please find attached the event details and schedule.",
        reminder: "This is a friendly reminder about our event tomorrow. Don't forget to bring your confirmation email and ID.",
        update: "We have an important update regarding our upcoming event. Please read the details below carefully.",
        "thank-you": "Thank you for attending our event! We hope you had a great experience. Please share your feedback with us."
      };
      setMessage(defaultMessages[templateId as keyof typeof defaultMessages] || "");
    }
  };

  const handleSendEmail = async () => {
    if (!selectedGroup || !subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate email sending
    setTimeout(() => {
      const group = attendeeGroups.find(g => g.id === selectedGroup);
      toast({
        title: "Email Sent Successfully!",
        description: `Email sent to ${group?.name} (${group?.count} recipients)`,
      });
      setIsSending(false);
      // Reset form
      setSelectedTemplate("");
      setSelectedGroup("");
      setSubject("");
      setMessage("");
    }, 2000);
  };

  const selectedGroupData = attendeeGroups.find(g => g.id === selectedGroup);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Attendees
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Template</label>
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a template (optional)" />
            </SelectTrigger>
            <SelectContent>
              {emailTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recipient Group */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Send to</label>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Select recipient group" />
            </SelectTrigger>
            <SelectContent>
              {attendeeGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{group.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {group.count}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedGroupData && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{selectedGroupData.count} recipients selected</span>
            </div>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Subject</label>
          <Input
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Message</label>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            className="resize-none"
          />
        </div>

        {/* Send Button */}
        <Button 
          onClick={handleSendEmail}
          disabled={isSending}
          className="w-full"
          size="lg"
        >
          {isSending ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </>
          )}
        </Button>

        {/* Recent Emails */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Emails</h4>
          <div className="space-y-2">
            {[
              { subject: "Welcome to EventCon 2024", group: "All Attendees", time: "2 hours ago" },
              { subject: "Parking Information", group: "VIP Guests", time: "1 day ago" },
              { subject: "Speaker Schedule Update", group: "All Attendees", time: "3 days ago" },
            ].map((email, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{email.subject}</p>
                  <p className="text-xs text-muted-foreground">to {email.group}</p>
                </div>
                <span className="text-xs text-muted-foreground">{email.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};