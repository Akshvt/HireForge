import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";

const faqCategories = [
  {
    id: "general",
    label: "General",
    emoji: "💡",
    faqs: [
      {
        q: "Is HireForge really free?",
        a: "Yes — 100% free, no hidden tiers, no credit card required. Our philosophy is simple: the best career tools shouldn't be gated behind a $29/month paywall. Every feature you see is available to every user, forever.",
      },
      {
        q: "How is HireForge different from ResumeWorded or Jobscan?",
        a: "ResumeWorded charges $29/month and Jobscan charges $49/month for similar features. HireForge provides everything they offer — ATS scoring, keyword analysis, job targeting, career path suggestions — completely free. We're also built by developers for developers, so our technical resume parsing is significantly more accurate for engineering roles.",
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
        a: "Our analysis pipeline: (1) Text extraction and normalization, (2) Section identification using NLP, (3) Keyword extraction and TF-IDF scoring, (4) ATS compliance checking against documented parser behaviors, (5) Benchmark comparison against 50,000+ analyzed resumes in our database, (6) LLM-powered suggestion generation. The entire pipeline runs in under 5 seconds.",
      },
      {
        q: "How does JD Targeting work?",
        a: "When you paste a job description, we extract required keywords, preferred skills, role seniority signals, and industry terminology using semantic NLP — not just exact keyword matching. We then compare this against your resume using cosine similarity scoring, identify gaps, and generate targeted suggestions. Semantic matching means we recognize that 'React.js' and 'ReactJS' are the same, and that experience with 'Docker' is relevant to a 'Kubernetes' requirement.",
      },
      {
        q: "What powers the AI suggestions?",
        a: "HireForge's AI suggestions are powered by advanced large language models. We've fine-tuned them on resume optimization patterns, hiring manager feedback, and successful resume-to-interview conversion data. This means suggestions are contextually appropriate, not generic template outputs.",
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
  <motion.div 
    layout
    className={`group rounded-2xl border transition-all duration-300 ${
      isOpen 
        ? "bg-white/[0.04] border-nebula/30 shadow-lg shadow-nebula/5" 
        : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
    }`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 p-6 text-left"
    >
      <span className={`font-bold text-lg leading-tight transition-colors ${isOpen ? "text-white" : "text-starlight/90 group-hover:text-white"}`}>{q}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`p-2 rounded-lg ${isOpen ? "bg-nebula/20 text-nebula" : "bg-white/5 text-dust group-hover:text-starlight"}`}
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </button>
    
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 pt-0">
            <p className="text-base text-dust leading-relaxed font-medium">{a}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ [key]: !prev[key] })); // Only allow one open at a time for cleaner UI
  };

  const filteredCategories = useMemo(() => {
    return faqCategories.map(cat => ({
      ...cat,
      faqs: cat.faqs.filter(faq =>
        search === "" ||
        faq.q.toLowerCase().includes(search.toLowerCase()) ||
        faq.a.toLowerCase().includes(search.toLowerCase())
      ),
    })).filter(cat => search === "" ? cat.id === activeCategory : cat.faqs.length > 0);
  }, [search, activeCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-void">
      {/* ═══ Hero section ═══ */}
      <section className="relative px-6 pt-32 pb-20 text-center overflow-hidden">
        {/* Background Glimmer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08)_0,transparent_70%)] -z-10 pointer-events-none" />
        
        <div className="container max-w-4xl mx-auto space-y-8 animate-fade-in">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-2.5 rounded-xl bg-nebula/10 text-nebula">
              <HelpCircle className="h-7 w-7" />
            </div>
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white font-jakarta">
              Everything you <br />
              <span className="text-gradient">need to know.</span>
            </h1>
            <p className="text-xl text-dust font-medium max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about ATS optimization, 
              security, and how to fast-track your career with HireForge.
            </p>
          </div>

          {/* Search Bar - Premium Focus Glow */}
          <div className="relative max-w-xl mx-auto mt-6 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula to-cyan rounded-2xl opacity-0 group-focus-within:opacity-20 blur-lg transition-opacity duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-dust group-focus-within:text-nebula transition-colors" />
              <Input
                placeholder="Search the knowledge base..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-16 bg-white/[0.03] border-white/10 rounded-2xl text-lg font-medium ring-nebula focus-visible:ring-1 focus-visible:border-nebula/50 transition-all placeholder:text-muted"
                id="faq-search"
              />
            </div>
            {search && (
               <button 
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-dust hover:text-white transition-colors tracking-widest uppercase"
               >
                  Clear
               </button>
            )}
          </div>
        </div>
      </section>

      {/* ═══ Main Content ═══ */}
      <section className="pb-32 px-6">
        <div className="container max-w-4xl mx-auto space-y-10">
          
          {/* Category Navigation */}
          {!search && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {faqCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? "bg-nebula border-nebula text-white shadow-lg shadow-nebula/20 scale-105"
                      : "bg-white/[0.02] border-white/5 text-dust hover:border-white/20 hover:text-starlight"
                  }`}
                >
                  <span className="mr-2 opacity-80">{cat.emoji}</span> {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Result Content */}
          <div className="space-y-12">
            {filteredCategories.map((cat, idx) => (
              <motion.div 
                key={cat.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                {search && (
                  <h2 className="text-xl font-bold text-white flex items-center gap-3 pb-2 border-b border-white/5">
                    <span className="opacity-50">{cat.emoji}</span> {cat.label}
                  </h2>
                )}
                
                <div className="grid gap-4">
                  {cat.faqs.map(faq => (
                    <FAQItem
                      key={faq.q}
                      q={faq.q}
                      a={faq.a}
                      isOpen={!!openItems[faq.q]}
                      onToggle={() => toggleItem(faq.q)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Empty State */}
            {filteredCategories.every(c => c.faqs.length === 0) && (
              <GlassCard index={0} levitate={false} tilt={false}>
                 <div className="p-16 text-center space-y-6">
                    <div className="inline-flex p-4 rounded-2xl bg-white/5 text-dust mb-2">
                       <Search className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-2xl font-bold text-white">No matches found</h3>
                       <p className="text-dust font-medium">We couldn't find any questions matching "{search}".</p>
                    </div>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setSearch("")}>
                       Reset Search Filters
                    </Button>
                 </div>
              </GlassCard>
            )}
          </div>
        </div>
      </section>

      {/* ═══ Support Section ═══ */}
      <section className="py-24 px-6 border-t border-white/5 relative bg-white/[0.01]">
        <div className="container max-w-4xl mx-auto">
          <div className="glass-panel p-10 md:p-14 rounded-[2rem] text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.05)_0,transparent_70%)] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05)_0,transparent_70%)] -z-10 pointer-events-none" />
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-white font-jakarta">Still have questions?</h2>
              <p className="text-lg text-dust font-medium max-w-md mx-auto">
                Can't find what you're looking for? Reach out to our engineering team directly.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton onClick={() => navigate("/contact")} variant="gradient" size="lg" className="h-14 px-8 font-bold">
                <MessageCircle className="h-5 w-5 mr-2" /> Message Support
              </MagneticButton>
              <MagneticButton onClick={() => navigate("/how-it-works")} variant="glass" size="lg" className="h-14 px-8 font-bold border-white/10">
                How It Works
              </MagneticButton>
            </div>
            
            <p className="text-xs font-bold text-muted uppercase tracking-[0.2em]">Response time: ~24 hours</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
