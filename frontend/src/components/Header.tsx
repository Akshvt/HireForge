import { FileText, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="gradient-hero text-primary-foreground py-16 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm animate-pulse-glow">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Resume<span className="text-gradient">AI</span>
          </h1>
        </div>
        
        <p className="text-center text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Optimize your resume for ATS systems, discover matching jobs, and chart your career path with AI-powered insights
        </p>

        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-primary-foreground/60">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Smart Job Matching</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Career Roadmaps</span>
          </div>
        </div>
      </div>
    </header>
  );
}
