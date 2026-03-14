import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, Search, RefreshCw, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";

const funMessages = [
  "Even the best resumes have gaps. This URL has a big one.",
  "Our ATS didn't find this page either. Ironic.",
  "404: Keyword not found in our URL database.",
  "This page got rejected before the recruiter even saw it.",
];

const NotFound = () => {
  const navigate = useNavigate();
  const [message] = useState(() => funMessages[Math.floor(Math.random() * funMessages.length)]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Bounce the 404 number for fun
    setCount(10);
    const t = setInterval(() => setCount(c => Math.max(0, c - 1)), 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* 404 Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter text-muted-foreground/20 select-none">
            404
          </h1>
          <div className="-mt-8 space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">Page Not Found</h2>
            <p className="text-muted-foreground italic">{message}</p>
          </div>
        </div>

        {/* Score Card Easter Egg */}
        <div className="p-5 rounded-2xl bg-card border max-w-xs mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">URL Compatibility Score</span>
            <span className="text-xs text-muted-foreground">HireForge Analysis</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-4xl font-black text-destructive">0</div>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-0 rounded-full bg-destructive" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">This URL does not exist in our database</p>
            </div>
          </div>
          <div className="mt-3 p-2.5 rounded-lg bg-destructive/10 text-xs text-destructive font-medium">
            ⚠ Critical Issue: Page not found. Recommend updating the URL immediately.
          </div>
        </div>

        {/* Navigation Options */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Here are some pages that actually exist:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate("/")} className="gap-2" size="lg">
              <Home className="h-4 w-4" /> Go Home
            </Button>
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="gap-2" size="lg">
              Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {[
              { label: "How It Works", path: "/how-it-works" },
              { label: "About", path: "/about" },
              { label: "FAQ", path: "/faq" },
              { label: "Contact", path: "/contact" },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
