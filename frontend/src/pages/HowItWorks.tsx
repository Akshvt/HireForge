import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, ScanLine, Sparkles, Target, Briefcase, ArrowRight, CheckCircle2, Code2, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";

const steps = [
  {
    number: "01",
    icon: Upload,
    color: "text-nebula",
    glowColor: "nebula",
    title: "Upload Your Resume",
    subtitle: "PDF, DOCX, or plain text — we handle it all",
    description: "Drag and drop your resume or paste the text directly into HireForge. Our parser extracts every detail: skills, experience, education, certifications, and formatting structure.",
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
    color: "text-aurora",
    glowColor: "aurora",
    title: "Get Your ATS Score",
    subtitle: "See exactly how automated systems read your resume",
    description: "Our AI simulates 20+ ATS parameters — keyword density, formatting compliance, section structure, action verbs, and more. You receive a score from 0–100 with line-by-line feedback.",
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
    color: "text-starlight",
    glowColor: "nebula",
    title: "Improve with AI Suggestions",
    subtitle: "Concrete, actionable fixes — not vague advice",
    description: "HireForge doesn't just tell you what's wrong — it shows you exactly how to fix it. Powered by advanced AI that reviews millions of lines of code, our suggestions are precise and contextual.",
    details: [
      "Line-by-line rewrite suggestions from AI",
      "Bullet point improvements with impact language",
      "Missing keyword identification and integration tips",
      "Before/after comparisons for each suggestion",
    ],
    tip: "💡 Powered by the same engine used by 100,000+ developers.",
  },
  {
    number: "04",
    icon: Target,
    color: "text-cyan",
    glowColor: "cyan",
    title: "Target Specific Jobs",
    subtitle: "Tailor your resume to every application",
    description: "Paste any job description and our JD Targeting engine compares it against your resume in real time. You'll see a compatibility score, every keyword gap, and specific suggestions.",
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
    color: "text-nova",
    glowColor: "nova",
    title: "Land the Job",
    subtitle: "Discover matching roles and track your progress",
    description: "Once your resume is optimized, HireForge matches you to real open positions from top platforms — filtered by your skills, experience level, and target role.",
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
    <div className="flex flex-col min-h-screen bg-void">
      {/* ═══ Hero section ═══ */}
      <section className="relative px-6 pt-32 pb-20 text-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0,transparent_60%)] -z-10 pointer-events-none" />
        
        <div className="container max-w-4xl mx-auto space-y-8">
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white font-jakarta">
              The <span className="text-gradient">Career Engine</span> <br />
              Blueprint.
            </h1>
            <p className="text-xl text-dust font-medium max-w-2xl mx-auto leading-relaxed">
              A 5-step journey that turns ATS rejections into interview invitations.
              Engineered for speed, built for results.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <MagneticButton size="lg" variant="gradient" className="h-14 px-10 font-bold" onClick={() => navigate("/register")}>
              Start Forging Free <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ═══ Steps Section ═══ */}
      <section className="pb-32 px-6 relative">
        {/* Timeline Line (Desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block -translate-x-1/2" />

        <div className="container max-w-6xl mx-auto space-y-24">
          {steps.map((step, i) => (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image/Visual Placeholder */}
              <div className="w-full lg:w-1/2">
                <GlassCard index={i} glowColor={step.glowColor as any} levitate={true} tilt={true}>
                   <div className="aspect-video flex items-center justify-center p-12 relative overflow-hidden group">
                      <div className={`absolute inset-0 bg-gradient-to-br from-${step.glowColor}/10 to-transparent opacity-50`} />
                      <step.icon className={`h-24 w-24 ${step.color} relative z-10 transition-transform duration-500 group-hover:scale-110`} />
                      
                      {/* Floating Decorative Elements */}
                      <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                      <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-white/10 animate-ping" />
                      
                      <div className="absolute bottom-6 right-6 text-8xl font-black text-white/[0.03] select-none">{step.number}</div>
                   </div>
                </GlassCard>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-black uppercase tracking-[0.2em] ${step.color}`}>Step {step.number}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white font-jakarta">{step.title}</h2>
                  <p className="text-lg text-dust font-medium leading-relaxed">{step.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-3">
                      <div className="mt-1.5 p-0.5 rounded-full bg-aurora/20 text-aurora">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-dust/90 font-medium">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3 italic text-sm text-starlight/70">
                   <Zap className="h-4 w-4 text-nebula shrink-0 mt-0.5" />
                   {step.tip}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ Ecosystem Connection ═══ */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0,transparent_60%)] -z-10 pointer-events-none" />
        
        <div className="container max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
             <div className="flex items-center justify-center gap-6 mb-4">
               <motion.div whileHover={{ scale: 1.1 }} className="p-4 rounded-3xl bg-white/[0.03] border border-white/5">
                 <Code2 className="h-10 w-10 text-nebula" />
               </motion.div>
               <div className="text-3xl font-black text-white/20">+</div>
               <motion.div whileHover={{ scale: 1.1 }} className="p-4 rounded-3xl bg-white/[0.03] border border-white/5">
                 <Briefcase className="h-10 w-10 text-cyan" />
               </motion.div>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white font-jakarta tracking-tight">
               Built by engineers, <br />
               <span className="text-gradient">for engineers.</span>
             </h2>
             <p className="text-xl text-dust font-medium max-w-2xl mx-auto leading-relaxed">
               The same AI intelligence that optimizes production code now optimizes your career trajectory. 
               Welcome to the future of technical hiring.
             </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton onClick={() => navigate("/register")} variant="gradient" size="lg" className="h-14 px-8 font-bold">
              Join HireForge
            </MagneticButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
