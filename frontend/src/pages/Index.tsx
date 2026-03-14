import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Target, Zap, Star, Code2, TrendingUp, Award } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import PoweredByCodeSage from "@/components/PoweredByCodeSage";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Siddharth Rao",
    title: "Software Engineer → Senior SWE at Atlassian",
    avatar: "S",
    avatarColor: "from-blue-500 to-cyan-500",
    quote: "I was applying for 6 months with no callbacks. HireForge showed my ATS score was 43 — embarrassingly low. After following the suggestions for one afternoon, it jumped to 91. Got 3 interview calls within 2 weeks. Atlassian offer came 5 weeks later.",
    metric: "ATS: 43 → 91",
    metricColor: "text-green-500",
  },
  {
    name: "Meera Krishnamurthy",
    title: "Marketing Analyst → Product Manager at Swiggy",
    avatar: "M",
    avatarColor: "from-purple-500 to-pink-500",
    quote: "I was trying to break into product management with a marketing background. The JD Targeting feature showed me exactly which PM keywords I needed to add to highlight transferable experience. Completely changed how I framed my resume. Landed a PM role in 3 weeks.",
    metric: "Callback rate: 3× increase",
    metricColor: "text-blue-500",
  },
  {
    name: "James Okoye",
    title: "CS Graduate → Backend Engineer at Razorpay",
    avatar: "J",
    avatarColor: "from-green-500 to-emerald-500",
    quote: "As a fresh grad, I had no idea what recruiters even looked for. HireForge was like having a senior dev review my resume. The AI suggestions reworked my project bullets to actually quantify impact. Got 5 interviews and 2 offers. Accepted Razorpay. Couldn't have done it without this.",
    metric: "5 interviews, 2 offers",
    metricColor: "text-purple-500",
  },
  {
    name: "Pratha Joshi",
    title: "Full Stack Developer at Notion",
    avatar: "P",
    avatarColor: "from-orange-500 to-amber-500",
    quote: "I was using ResumeWorded's free tier and paying $29/month for the premium. HireForge gives me more — the JD targeting is genuinely better, and the career path feature showed me skills I needed to invest in for my next role. Cancelled ResumeWorded immediately.",
    metric: "Saved $348/year",
    metricColor: "text-accent",
  },
  {
    name: "Aryan Kapoor",
    title: "Data Scientist at PhonePe",
    avatar: "A",
    avatarColor: "from-red-500 to-rose-500",
    quote: "What I love is how specific the feedback is. Not 'add more keywords' but 'add Spark, MLflow, and A/B testing — these appear 8 times in this JD and 0 times in your resume.' That level of detail at zero cost is insane. Improved ATS score from 62 to 94 in one week.",
    metric: "ATS: 62 → 94 in 1 week",
    metricColor: "text-green-500",
  },
  {
    name: "Divya Nambiar",
    title: "DevOps Engineer at Zepto",
    avatar: "D",
    avatarColor: "from-teal-500 to-cyan-500",
    quote: "Already using CodeSage for code reviews at work. When HireForge dropped from the same team, I knew it would be good. It did not disappoint. Went from 71 to 89 ATS score, and the job matching found a DevOps role I hadn't seen on other platforms. Joined Zepto 6 weeks later.",
    metric: "ATS: 71 → 89",
    metricColor: "text-green-500",
  },
];

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col gap-0 pb-0">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-32 text-center md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(var(--primary-rgb),0.1)_0%,transparent_100%)]" />
        <div className="container max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Zap className="h-4 w-4 fill-current" />
              <span>AI-Powered Career Optimization</span>
            </div>
            <PoweredByCodeSage variant="badge" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance">
            Land your dream job with <span className="text-primary italic">HireForge</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            The free alternative to ResumeWorded. Optimize your resume for ATS, target specific jobs,
            and get AI career advice — powered by CodeSage AI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-lg gap-2" onClick={() => navigate("/register")}>
              Analyze My Resume Free <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg gap-2" onClick={() => navigate("/how-it-works")}>
              <Zap className="h-4 w-4" /> See How It Works
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
            {["No credit card", "No premium tier", "50,000+ resumes analyzed"].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container max-w-5xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl border bg-card hover:shadow-lg transition-shadow space-y-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 w-fit">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">ATS Optimizer</h3>
            <p className="text-muted-foreground">
              Score your resume against 20+ parameters used by real ATS systems. Get line-by-line fixes.
            </p>
          </div>
          <div className="p-8 rounded-3xl border bg-card hover:shadow-lg transition-shadow space-y-4">
            <div className="p-3 rounded-2xl bg-green-500/10 text-green-600 w-fit">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">JD Targeting</h3>
            <p className="text-muted-foreground">
              Compare your resume against any job description. Find missing keywords and close the gap instantly.
            </p>
          </div>
          <div className="p-8 rounded-3xl border bg-card hover:shadow-lg transition-shadow space-y-4">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-600 w-fit">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Smart Matching</h3>
            <p className="text-muted-foreground">
              Instantly discover and apply to jobs that match your skills — not just your title.
            </p>
          </div>
        </div>
      </section>

      {/* Why HireForge */}
      <section className="bg-muted/50 py-20 mt-16">
        <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Why choose HireForge?</h2>
            <div className="space-y-4">
              {[
                "100% Free — No hidden premium tiers, ever",
                "Built by developers who've been on both sides of hiring",
                "Deep ATS analysis across 20+ parameters",
                "AI suggestions powered by CodeSage's NLP engine",
                "Real-time job matching from top platforms",
                "Private and encrypted resume storage",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <PoweredByCodeSage variant="badge" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl aspect-video border flex items-center justify-center p-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border w-full space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">ATS Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-green-500">94</span>
                    <span className="text-sm text-green-500 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> +32
                    </span>
                  </div>
                </div>
                <Award className="h-10 w-10 text-green-500 opacity-20" />
              </div>
              <div className="space-y-2">
                {[
                  { label: "Keywords", val: 94 },
                  { label: "Formatting", val: 100 },
                  { label: "Impact", val: 88 },
                ].map(s => (
                  <div key={s.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-medium">{s.val}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${s.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">Real people, real results</h2>
            <p className="text-muted-foreground text-lg">
              Join 50,000+ job seekers who used HireForge to land the interview
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-3xl bg-card border hover:shadow-md transition-shadow space-y-4 flex flex-col">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{t.title}</p>
                  </div>
                  <span className={`text-xs font-bold ${t.metricColor} shrink-0 text-right`}>{t.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CodeSage Ecosystem Callout */}
      <section className="py-16 px-4 bg-muted/40">
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5 border p-8 md:p-10 text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Code2 className="h-6 w-6 text-accent" />
              <span className="text-muted-foreground font-medium">+</span>
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Part of the CodeSage Ecosystem</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Already using <a href="https://codesage.dev" className="text-accent font-semibold hover:underline" target="_blank" rel="noopener noreferrer">CodeSage</a> for AI code reviews?
              HireForge completes your career stack. Same AI engine. Zero cost.
            </p>
            <p className="text-primary font-semibold italic text-lg">
              "CodeSage reviews your code. HireForge reviews your career. Together, they make you unstoppable."
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="h-12 px-8 gap-2" onClick={() => navigate("/register")}>
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Button>
              <a href="https://codesage.dev" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-12 px-8 gap-2">
                  <Code2 className="h-4 w-4" /> Visit CodeSage
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-5xl mx-auto px-4 text-center space-y-8 py-20">
        <h2 className="text-4xl font-bold">Ready to land your next role?</h2>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Join thousands of developers using HireForge to optimize their career path.
        </p>
        <Button size="lg" className="h-14 px-10 text-lg rounded-full gap-2" onClick={() => navigate("/register")}>
          Create Free Account <ArrowRight className="h-5 w-5" />
        </Button>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
