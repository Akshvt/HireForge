import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Clock, CheckCircle2, AlertCircle, MapPin, Send, HelpCircle } from "lucide-react";
import Footer from "@/components/Footer";

const responseExpectations = [
  { icon: Clock, title: "General Inquiries", time: "Within 24 hours", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: AlertCircle, title: "Bug Reports", time: "Within 4 hours", color: "text-orange-500", bg: "bg-orange-500/10" },
  { icon: CheckCircle2, title: "Account Issues", time: "Within 12 hours", color: "text-green-500", bg: "bg-green-500/10" },
  { icon: MessageSquare, title: "Feature Requests", time: "Acknowledged within 48h", color: "text-purple-500", bg: "bg-purple-500/10" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

const Contact = () => {
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1500));
    setFormStatus("success");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative px-4 pt-16 pb-12 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(35%_30%_at_50%_50%,rgba(var(--primary-rgb),0.06)_0%,transparent_100%)]" />
        <div className="container max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question, found a bug, or want to share feedback? We'd love to hear from you.
            Real humans review every message.
          </p>
        </div>
      </section>

      {/* Response Expectations */}
      <section className="px-4 pb-10">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {responseExpectations.map((item) => (
              <div key={item.title} className="p-4 rounded-2xl bg-card border text-center space-y-2">
                <div className={`p-2.5 rounded-xl ${item.bg} w-fit mx-auto`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <p className="text-sm font-semibold leading-tight">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info Grid */}
      <section className="px-4 pb-16">
        <div className="container max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-3">
            {formStatus === "success" ? (
              <div className="p-10 rounded-3xl bg-card border text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">Message Received!</h2>
                <p className="text-muted-foreground">
                  Thanks for reaching out. We'll respond to <strong>{formData.email}</strong> within our standard response time for <strong>{formData.category}</strong> inquiries.
                </p>
                <Button onClick={() => setFormStatus("idle")} variant="outline">Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-card border space-y-5">
                <h2 className="text-xl font-bold">Send us a message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="account">Account Issue</option>
                    <option value="feature">Feature Request</option>
                    <option value="privacy">Privacy / Data Request</option>
                    <option value="partnership">Partnership / API</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Brief summary of your issue" required value={formData.subject} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please describe your question or issue in detail. Include any error messages you've seen."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="resize-none"
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={formStatus === "submitting"} id="submit-contact">
                  {formStatus === "submitting" ? (
                    <>Sending...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our <button type="button" onClick={() => navigate("/privacy")} className="underline hover:text-foreground">Privacy Policy</button>.
                  We'll only use your email to respond to your inquiry.
                </p>
              </form>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="md:col-span-2 space-y-5">
            <div className="p-6 rounded-3xl bg-card border space-y-4">
              <h3 className="font-bold">Other ways to reach us</h3>
              <div className="space-y-3">
                <a href="mailto:hello@hireforge.dev" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <div className="p-2 rounded-lg bg-muted">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">General</p>
                    <p>hello@hireforge.dev</p>
                  </div>
                </a>
                <a href="mailto:privacy@hireforge.dev" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <div className="p-2 rounded-lg bg-muted">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Privacy / Data</p>
                    <p>privacy@hireforge.dev</p>
                  </div>
                </a>
                <a href="mailto:api@hireforge.dev" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <div className="p-2 rounded-lg bg-muted">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">API / Partnerships</p>
                    <p>api@hireforge.dev</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-card border space-y-3">
              <h3 className="font-bold">Check the FAQ first</h3>
              <p className="text-sm text-muted-foreground">
                Many common questions about ATS scoring, resume tips, and account settings are already answered in our FAQ.
              </p>
              <Button variant="outline" className="w-full gap-2" onClick={() => navigate("/faq")}>
                <HelpCircle className="h-4 w-4" /> Browse FAQ
              </Button>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5 border space-y-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-bold">HireForge by CodeSage</h3>
              <p className="text-sm text-muted-foreground">
                Part of the CodeSage developer toolkit ecosystem. Made with ❤️ by developers, for developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
