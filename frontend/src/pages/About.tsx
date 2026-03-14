import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Briefcase, Cpu, Target, Heart, Sparkles, ArrowRight, ExternalLink, Zap } from "lucide-react";
import PoweredByCodeSage from "@/components/PoweredByCodeSage";
import Footer from "@/components/Footer";


const milestones = [
  { year: "2023", title: "The Problem", desc: "Three brilliant friends failed ATS filters despite being highly qualified. Arjun and Priya decided to fix that." },
  { year: "2024 Q1", title: "CodeSage Born", desc: "Launched CodeSage — an AI code reviewer. Realized the same people who struggle with code also struggle with career tools." },
  { year: "2024 Q3", title: "HireForge Concept", desc: "Internal hackathon project beats ResumeWorded in blind testing. Decision made: ship it, make it free." },
  { year: "2025 Q1", title: "Public Beta", desc: "10,000 users in month one. Average ATS score improvement: +31 points. Zero paid marketing — all word of mouth." },
  { year: "2026", title: "Today", desc: "50,000+ resumes analyzed. Part of the CodeSage ecosystem — the ultimate free toolkit for developer careers." },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(var(--primary-rgb),0.08)_0%,transparent_100%)]" />
        <div className="container max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <PoweredByCodeSage variant="badge" className="mx-auto" />
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
            We built the resume tool <br />
            <span className="text-primary italic">we wish existed</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            HireForge was born from frustration: brilliant people losing to ATS bots. We're part of the
            CodeSage ecosystem — AI tools that make great developers unstoppable.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">50,000+ Resumes Analyzed</Badge>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">+31 Avg ATS Score Lift</Badge>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">100% Free Forever</Badge>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted/40 py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider">
            <Heart className="h-4 w-4 fill-current" /> Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Every great candidate deserves a fair shot.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            75% of resumes are rejected by ATS before a human ever sees them. That's not a skills
            problem — it's a formatting and keyword problem. HireForge gives every job seeker the
            same insider knowledge that expensive career coaches charge hundreds of dollars for.
            <br /><br />
            <strong>Why is it free?</strong> Because we're developers too. We know what it's like
            to be great at the work but bad at "playing the game." The CodeSage ecosystem exists to
            give developers an unfair advantage — in code reviews and in career moves.
          </p>
          <div className="grid md:grid-cols-3 gap-6 pt-4 text-left">
            <div className="p-6 rounded-2xl bg-card border space-y-3">
              <Cpu className="h-7 w-7 text-blue-500" />
              <h3 className="font-bold text-lg">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">Our NLP engine reads your resume the same way ATS software does — then tells you exactly what to fix.</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border space-y-3">
              <Target className="h-7 w-7 text-green-500" />
              <h3 className="font-bold text-lg">Job-Specific Targeting</h3>
              <p className="text-sm text-muted-foreground">Paste any job description and get a tailored gap analysis. Know exactly what keywords you're missing.</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border space-y-3">
              <Briefcase className="h-7 w-7 text-orange-500" />
              <h3 className="font-bold text-lg">Built by Insiders</h3>
              <p className="text-sm text-muted-foreground">Our team includes ex-Amazon recruiters who designed the very ATS filters we help you beat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CodeSage Ecosystem */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-background border p-8 md:p-12 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">The CodeSage Story</h2>
                <p className="text-muted-foreground">Why a code review AI built a resume tool</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  CodeSage started as an AI code reviewer — helping developers write cleaner, more
                  efficient code. But we kept hearing the same story: great developers, terrible
                  job outcomes. Not because they couldn't code, but because their resumes never
                  made it past the first filter.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We realized we had the AI infrastructure, the NLP expertise, and the recruiter
                  relationships to fix this. So we built HireForge — and made it free, because
                  that's who we are.
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-card border space-y-2">
                  <div className="flex items-center gap-3">
                    <Code2 className="h-5 w-5 text-accent" />
                    <span className="font-bold">CodeSage</span>
                    <span className="text-xs text-muted-foreground">→ Reviews your code</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-card border space-y-2">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="font-bold">HireForge</span>
                    <span className="text-xs text-muted-foreground">→ Reviews your career</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <p className="text-sm font-medium italic text-center">
                    "Together, they make you unstoppable."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="https://codesage.dev" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Code2 className="h-4 w-4" /> Explore CodeSage <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
              <Button onClick={() => navigate("/how-it-works")} className="gap-2">
                How HireForge Works <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/40 py-16 px-4">
        <div className="container max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-muted-foreground">From frustration to 50,000 users</p>
          </div>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl bg-card border hover:shadow-sm transition-shadow">
                <div className="text-center w-20 shrink-0">
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full whitespace-nowrap">{m.year}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="container max-w-3xl mx-auto space-y-6">
          <Zap className="h-10 w-10 text-accent mx-auto" />
          <h2 className="text-3xl font-bold">Ready to get your resume noticed?</h2>
          <p className="text-muted-foreground text-lg">
            Join 50,000+ job seekers who've used HireForge to land the interview.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" className="h-12 px-8 gap-2" onClick={() => navigate("/register")}>
              Analyze My Resume Free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/how-it-works")}>
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
