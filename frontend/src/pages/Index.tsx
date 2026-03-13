import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Target, Zap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32 text-center md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(var(--primary-rgb),0.1)_0%,transparent_100%)]" />
        <div className="container max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Zap className="h-4 w-4 fill-current" />
            <span>AI-Powered Career Optimization</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance">
            Land your dream job with <span className="text-primary italic">HireForge</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            The free alternative to ResumeWorded. Optimize your resume for ATS, discover matching jobs, and get personalized career advice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-lg gap-2" onClick={() => navigate("/register")}>
              Get Started for Free <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border bg-card hover:shadow-lg transition-shadow space-y-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 w-fit">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">ATS Optimizer</h3>
            <p className="text-muted-foreground">
              Score your resume against 20+ parameters used by recruiters and ATS systems.
            </p>
          </div>
          <div className="p-8 rounded-3xl border bg-card hover:shadow-lg transition-shadow space-y-4">
            <div className="p-3 rounded-2xl bg-green-500/10 text-green-600 w-fit">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">JD Targeting</h3>
            <p className="text-muted-foreground">
              Compare your resume against any job description to find missing keywords and gaps.
            </p>
          </div>
          <div className="p-8 rounded-3xl border bg-card hover:shadow-lg transition-shadow space-y-4">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 w-fit">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Smart Matching</h3>
            <p className="text-muted-foreground">
              Instantly find and apply to jobs that match your skills and experience.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / Checkmarks */}
      <section className="bg-muted/50 py-20">
        <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Why choose HireForge?</h2>
            <div className="space-y-4">
              {[
                "100% Free - No hidden premium tiers",
                "Built by developers, for developers",
                "Deep ATS analysis across 20+ parameters",
                "Real-time job matching from top platforms",
                "Secure and private resume storage"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl aspect-video border flex items-center justify-center p-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border w-full space-y-4 animate-pulse">
              <div className="h-4 w-1/2 bg-muted rounded" />
              <div className="h-10 w-full bg-muted rounded" />
              <div className="h-24 w-full bg-muted rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-5xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-4xl font-bold">Ready to land your next role?</h2>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Join thousands of developers using HireForge to optimize their career path.
        </p>
        <Button size="lg" className="h-14 px-10 text-lg rounded-full" onClick={() => navigate("/register")}>
          Create Free Account
        </Button>
      </section>

      {/* Standard Footer */}
      <footer className="container max-w-5xl mx-auto px-4 pt-10 border-t text-center text-sm text-muted-foreground">
        <p>© 2026 HireForge. Part of the CodeSage Suite.</p>
      </footer>
    </div>
  );
};

export default Index;
