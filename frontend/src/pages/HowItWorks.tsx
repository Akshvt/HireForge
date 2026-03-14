import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, ScanLine, Sparkles, Target, Briefcase, ArrowRight, CheckCircle2, Code2 } from "lucide-react";
import PoweredByCodeSage from "@/components/PoweredByCodeSage";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    icon: Upload,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    title: "Upload Your Resume",
    subtitle: "PDF, DOCX, or plain text — we handle it all",
    description: "Drag and drop your resume or paste the text directly into HireForge. Our parser extracts every detail: skills, experience, education, certifications, and formatting structure. We support files up to 5MB.",
    details: [
      "Instant parsing — results in under 5 seconds",
      "Supports PDF, DOCX, DOC, and plain text",
      "Your data is encrypted and never shared",
      "Past uploads saved in your Resume History",
    ],
    tip: "💡 Tip: Upload the same resume you intend to submit — don't over-polish before the analysis.",
  },
  {
    number: "02",
    icon: ScanLine,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    title: "Get Your ATS Score",
    subtitle: "See exactly how automated systems read your resume",
    description: "Our AI simulates 20+ ATS parameters — keyword density, formatting compliance, section structure, action verbs, quantifiable achievements, and more. You receive a score from 0–100 with line-by-line feedback.",
    details: [
      "Scored across 20+ ATS compatibility factors",
      "Section-by-section breakdown with priority fixes",
      "Action verb analysis and power word suggestions",
      "Readability and length benchmarking",
    ],
    tip: "💡 Scores above 80 significantly increase interview callback rates.",
  },
  {
    number: "03",
    icon: Sparkles,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    title: "Improve with AI Suggestions",
    subtitle: "Concrete, actionable fixes — not vague advice",
    description: "HireForge doesn't just tell you what's wrong — it shows you exactly how to fix it. Powered by the same CodeSage AI that reviews millions of lines of code, our suggestions are precise, contextual, and immediately actionable.",
    details: [
      "Line-by-line rewrite suggestions from CodeSage AI",
      "Bullet point improvements with impact language",
      "Missing keyword identification and integration tips",
      "Before/after comparisons for each suggestion",
    ],
    tip: "💡 Powered by CodeSage AI — the same engine used by 100,000+ developers for code reviews.",
    codesage: true,
  },
  {
    number: "04",
    icon: Target,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    title: "Target Specific Jobs",
    subtitle: "Tailor your resume to every application",
    description: "Paste any job description and our JD Targeting engine compares it against your resume in real time. You'll see a compatibility score, every keyword gap, and specific suggestions to make your resume speak the recruiter's language.",
    details: [
      "Semantic keyword matching (not just exact matches)",
      "Required vs. preferred skills gap analysis",
      "Industry-specific terminology suggestions",
      "Role seniority alignment check",
    ],
    tip: "💡 Tailoring a resume to a specific JD increases ATS pass rate by up to 40%.",
  },
  {
    number: "05",
    icon: Briefcase,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    title: "Land the Job",
    subtitle: "Discover matching roles and track your progress",
    description: "Once your resume is optimized, HireForge matches you to real open positions from top platforms — filtered by your skills, experience level, and target role. Track your history, monitor score improvements, and refine your approach over time.",
    details: [
      "Real-time job matching from major platforms",
      "Filter by role, location, and experience level",
      "Resume history with score trend tracking",
      "Career path AI — see where your skills can take you",
    ],
    tip: "💡 Users who optimize before applying report 3× more interview callbacks.",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(var(--primary-rgb),0.07)_0%,transparent_100%)]" />
        <div className="container max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <PoweredByCodeSage variant="badge" className="mx-auto" />
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            From resume to <span className="text-primary italic">offer letter</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A 5-step journey that turns ATS rejections into interview invitations.
            Takes less than 10 minutes. Completely free.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" className="h-12 px-8 gap-2" onClick={() => navigate("/register")}>
              Start Now — It's Free <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 px-4">
        <div className="container max-w-4xl mx-auto space-y-6">
          {steps.map((step, i) => (
            <div key={step.number} className={`rounded-3xl border p-8 md:p-10 space-y-6 hover:shadow-md transition-shadow ${step.codesage ? "bg-gradient-to-br from-accent/5 to-card" : "bg-card"}`}>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Step Number + Icon */}
                <div className="flex items-start gap-4 md:flex-col md:items-center md:w-24 shrink-0">
                  <div className={`p-4 rounded-2xl ${step.bgColor} border ${step.borderColor}`}>
                    <step.icon className={`h-7 w-7 ${step.color}`} />
                  </div>
                  <div className="text-6xl font-black text-muted-foreground/20 hidden md:block">{step.number}</div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider ${step.color}`}>Step {step.number}</span>
                        {step.codesage && <PoweredByCodeSage variant="inline" />}
                      </div>
                      <h2 className="text-2xl font-bold">{step.title}</h2>
                      <p className={`text-sm font-medium ${step.color} mt-0.5`}>{step.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                  <div className="grid sm:grid-cols-2 gap-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-muted/60 text-sm text-muted-foreground italic">
                    {step.tip}
                  </div>
                </div>
              </div>

              {/* Connector for non-last steps */}
              {i < steps.length - 1 && (
                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-muted-foreground/30 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CodeSage Connection */}
      <section className="py-16 px-4 bg-muted/40">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Code2 className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold">+</span>
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">HireForge + CodeSage = Complete Career Stack</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Already using CodeSage for AI code reviews? Your career toolkit is now complete.
            The same AI intelligence that improves your code now improves your career story.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://codesage.dev" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="gap-2">
                Visit CodeSage <Code2 className="h-4 w-4" />
              </Button>
            </a>
            <Button size="lg" className="gap-2" onClick={() => navigate("/register")}>
              Try HireForge Free <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
