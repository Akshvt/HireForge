import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

const faqCategories = [
  {
    id: "general",
    label: "General",
    emoji: "💡",
    faqs: [
      {
        q: "Is HireForge really free?",
        a: "Yes — 100% free, no hidden tiers, no credit card required. HireForge is built and funded as part of the CodeSage ecosystem. Our philosophy is simple: the best career tools shouldn't be gated behind a $29/month paywall. Every feature you see is available to every user, forever.",
      },
      {
        q: "How is HireForge different from ResumeWorded or Jobscan?",
        a: "ResumeWorded charges $29/month and Jobscan charges $49/month for similar features. HireForge provides everything they offer — ATS scoring, keyword analysis, job targeting, career path suggestions — completely free. We're also built by developers for developers, so our technical resume parsing is significantly more accurate for engineering roles.",
      },
      {
        q: "Who built HireForge?",
        a: "HireForge was built by the team behind CodeSage, an AI code review platform. We're a team of ex-Google, ex-Stripe, and ex-Amazon engineers and recruiters who got frustrated watching brilliant candidates get filtered out by ATS bots. Learn more on our About page.",
      },
      {
        q: "Do I need to create an account?",
        a: "Yes, a free account is required to save your resume analysis, track improvements over time, and access your resume history. Registration takes under a minute and only requires your name, email, and password.",
      },
      {
        q: "How many resumes can I upload?",
        a: "There's no hard limit on the number of resumes you can upload and analyze. We store your last 10 analyses in your Resume History, with the full ATS breakdown available for each.",
      },
    ],
  },
  {
    id: "ats",
    label: "ATS & Scoring",
    emoji: "🎯",
    faqs: [
      {
        q: "What is an ATS score and why does it matter?",
        a: "ATS stands for Applicant Tracking System — the software 99% of Fortune 500 companies use to filter resumes before a human sees them. An ATS score reflects how well your resume is formatted and keyword-optimized for these systems. Studies show 75% of resumes are rejected by ATS before reaching a recruiter. A score above 80 significantly increases your chance of making it through.",
      },
      {
        q: "What factors affect my ATS score?",
        a: "We analyze 20+ parameters including: keyword density and relevance, section structure (Experience, Education, Skills headers), formatting compliance (no tables, graphics, or unusual fonts), use of quantifiable achievements, action verb strength, contact information completeness, file format compatibility, resume length benchmarking, and more.",
      },
      {
        q: "My ATS score is low — what should I fix first?",
        a: "Focus on high-impact fixes first: (1) Add relevant keywords from the job description, (2) Ensure you have clear section headers: Summary, Experience, Education, Skills, (3) Replace passive language with strong action verbs (Led, Built, Improved, Reduced, Increased), (4) Add numbers to your achievements (increased sales by 40%, managed 8-person team). These fixes typically raise scores by 15–30 points.",
      },
      {
        q: "Does formatting matter for ATS?",
        a: "Yes — heavily. ATS parsers struggle with: tables, text boxes, graphics, headers/footers, unusual fonts, columns, and images. Use a single-column layout with standard fonts (Arial, Calibri, Times New Roman). Avoid putting contact info or section titles in headers/footers — many parsers skip those areas entirely.",
      },
      {
        q: "What's a 'good' ATS score?",
        a: "HireForge uses a 0–100 scale: 0–49 is Needs Work (likely filtered out), 50–69 is Fair (may pass some filters), 70–84 is Good (passes most ATS filters), 85–100 is Excellent (optimized for ATS and human readers). Our users average a +31 point improvement after applying HireForge suggestions.",
      },
      {
        q: "Can HireForge guarantee I'll pass an ATS?",
        a: "No tool can guarantee ATS pass-through — each company configures their ATS differently with varying keyword weights. However, our analysis is based on common ATS patterns across Workday, Greenhouse, Lever, iCIMS, and Taleo, which cover 80%+ of enterprise job applications. Applying our suggestions typically increases your pass rate significantly.",
      },
    ],
  },
  {
    id: "resume",
    label: "Resume Tips",
    emoji: "📄",
    faqs: [
      {
        q: "How long should my resume be?",
        a: "For most professionals: 1 page if you have under 10 years of experience, 2 pages for 10+ years. For senior roles or academic positions, 2–3 pages is acceptable. Our ATS scorer flags resumes that are too short (<400 words, which signals lack of detail) or too long (>2 pages for mid-level roles). The sweet spot for most engineering roles is 500–750 words on a single page.",
      },
      {
        q: "What's the best resume format for tech roles?",
        a: "Use reverse-chronological format (most recent job first). Structure: (1) Contact info + LinkedIn/GitHub/Portfolio, (2) 2–3 line professional summary, (3) Skills section with technologies, (4) Work experience with bullet points, (5) Education, (6) Certifications/projects. Avoid functional or skills-based formats — ATS systems handle them poorly.",
      },
      {
        q: "How do I write better bullet points?",
        a: "Use the CAR formula: Context, Action, Result. Example: 'Reduced API response time by 60% (Context: from 800ms to 320ms) by refactoring database queries (Action) and implementing Redis caching (Action), resulting in 25% improvement in user retention (Result).' Always quantify: use numbers, percentages, timeframes, and scale.",
      },
      {
        q: "Should I include a summary/objective section?",
        a: "Yes — a 2–3 line professional summary is highly recommended. It's prime ATS keyword real estate and helps human readers quickly understand your value proposition. Write it in third person without the pronoun, focus on years of experience, core specialty, and biggest impact. Example: 'Full-stack engineer with 6 years experience building scalable SaaS products. Led teams delivering $2M ARR features at two Series B startups.'",
      },
      {
        q: "How should I list technical skills?",
        a: "Create a dedicated Skills section with technologies grouped by category: Languages (Python, Java, TypeScript), Frameworks (React, FastAPI, Spring), Cloud & DevOps (AWS, Docker, Kubernetes), Databases (PostgreSQL, MongoDB, Redis). Don't just list everything — focus on skills relevant to your target role. Our JD Targeting tool will tell you exactly which skills are missing for specific jobs.",
      },
      {
        q: "Should I include personal projects?",
        a: "Absolutely — especially if you're early career or changing domains. Include GitHub links (with stars/forks if impressive), describe the problem solved, tech stack used, and any measurable impact (users, uptime, performance metrics). A well-described project with real metrics can outweigh a mediocre job bullet point.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    emoji: "⚙️",
    faqs: [
      {
        q: "Is my resume data secure? Who can see my resume?",
        a: "Your resume data is encrypted in transit (TLS 1.3) and at rest (AES-256). Only you can see your resumes through your account. We do not sell, share, or use your resume data to train external AI models. Our AI analysis happens in isolated compute environments — no resume content leaves our secured infrastructure. See our Privacy Policy for full details.",
      },
      {
        q: "What file formats does HireForge accept?",
        a: "We accept PDF (recommended), DOCX, DOC, and plain text (.txt). For best parsing accuracy, use a clean PDF without scanned images. If your resume contains complex layouts with tables or text boxes, converting to plain text before upload will often produce more accurate results.",
      },
      {
        q: "How does the AI scoring engine work?",
        a: "Our analysis pipeline: (1) Text extraction and normalization, (2) Section identification using NLP, (3) Keyword extraction and TF-IDF scoring, (4) ATS compliance checking against documented parser behaviors, (5) Benchmark comparison against 50,000+ analyzed resumes in our database, (6) LLM-powered suggestion generation via CodeSage AI. The entire pipeline runs in under 5 seconds.",
      },
      {
        q: "How does JD Targeting work?",
        a: "When you paste a job description, we extract required keywords, preferred skills, role seniority signals, and industry terminology using semantic NLP — not just exact keyword matching. We then compare this against your resume using cosine similarity scoring, identify gaps, and generate targeted suggestions. Semantic matching means we recognize that 'React.js' and 'ReactJS' are the same, and that experience with 'Docker' is relevant to a 'Kubernetes' requirement.",
      },
      {
        q: "What powers the AI suggestions?",
        a: "HireForge's AI suggestions are powered by CodeSage AI — the same large language model that provides code reviews for 100,000+ developers. We've fine-tuned it on resume optimization patterns, hiring manager feedback, and successful resume-to-interview conversion data. This means suggestions are contextually appropriate, not generic template outputs.",
      },
      {
        q: "Can I use HireForge via API?",
        a: "API access is on our roadmap. If you're interested in integrating HireForge into your platform or workflow, contact us at api@hireforge.dev. We currently offer a manual export of ATS scores and analysis reports for all users.",
      },
      {
        q: "How do job recommendations work?",
        a: "Once your resume is analyzed, we extract your skills, experience level, and job title history. We match these against a regularly updated job database using semantic skill matching. Results are ranked by compatibility score, not recency — so you see the most relevant roles first. Filter by location, remote preference, and seniority to refine results.",
      },
    ],
  },
];

interface FAQItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ q, a, isOpen, onToggle }: FAQItemProps) => (
  <div className={`border rounded-xl transition-all ${isOpen ? "bg-card shadow-sm" : "bg-card/50 hover:bg-card"}`}>
    <button
      onClick={onToggle}
      className="w-full flex items-start justify-between gap-3 p-5 text-left"
      id={`faq-${q.substring(0, 20).replace(/\s/g, "-").toLowerCase()}`}
    >
      <span className="font-medium leading-snug">{q}</span>
      {isOpen
        ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
        : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
      }
    </button>
    {isOpen && (
      <div className="px-5 pb-5">
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    )}
  </div>
);

const FAQ = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(faq =>
      search === "" ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => search === "" ? cat.id === activeCategory : cat.faqs.length > 0);

  const totalFaqs = faqCategories.reduce((acc, c) => acc + c.faqs.length, 0);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative px-4 pt-16 pb-12 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_30%_at_50%_50%,rgba(var(--primary-rgb),0.06)_0%,transparent_100%)]" />
        <div className="container max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {totalFaqs}+ answers across ATS scoring, resume tips, technical details, and more.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11"
              id="faq-search"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs + FAQ Content */}
      <section className="py-8 px-4 flex-1">
        <div className="container max-w-3xl mx-auto space-y-6">
          {/* Category Tabs */}
          {!search && (
            <div className="flex flex-wrap gap-2">
              {faqCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* FAQ Items */}
          {filteredCategories.map(cat => (
            <div key={cat.id} className="space-y-3">
              {search && (
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span>{cat.emoji}</span> {cat.label}
                </h2>
              )}
              {cat.faqs.map(faq => (
                <FAQItem
                  key={faq.q}
                  q={faq.q}
                  a={faq.a}
                  isOpen={!!openItems[faq.q]}
                  onToggle={() => toggleItem(faq.q)}
                />
              ))}
              {filteredCategories.length > 0 && cat.faqs.length === 0 && search && (
                <p className="text-muted-foreground text-sm text-center py-4">No results in this category.</p>
              )}
            </div>
          ))}

          {filteredCategories.every(c => c.faqs.length === 0) && (
            <div className="text-center py-12 space-y-4">
              <p className="text-muted-foreground">No results found for "{search}"</p>
              <Button variant="outline" onClick={() => setSearch("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </section>

      {/* Still have questions? */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="container max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">Still have questions?</h2>
          <p className="text-muted-foreground">Our team typically responds within 24 hours.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => navigate("/contact")} className="gap-2">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/how-it-works")}>
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
