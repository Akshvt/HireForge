import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Code2, Briefcase, Cpu, Target, Heart, Sparkles, ArrowRight, ExternalLink, Zap, Globe, Users } from "lucide-react";
import PoweredByCodeSage from "@/components/PoweredByCodeSage";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";

const milestones = [
  { year: "2023", title: "The Problem", desc: "Three friends failed ATS filters despite being highly qualified. Arjun and Priya decided to fix that." },
  { year: "2024 Q1", title: "CodeSage Born", desc: "Launched CodeSage — an AI code reviewer. Realized the same people who struggle with code also struggle with career tools." },
  { year: "2024 Q3", title: "HireForge Concept", desc: "Internal hackathon project beats industry leaders in blind testing. Decision made: ship it, make it free." },
  { year: "2025 Q1", title: "Public Beta", desc: "10,000 users in month one. Average ATS score improvement: +31 points. Zero paid marketing." },
  { year: "2026", title: "Global Expansion", desc: "50,000+ resumes analyzed. Part of the CodeSage ecosystem — the ultimate free toolkit for developer careers." },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-void overflow-x-hidden">
      {/* ═══ Hero section ═══ */}
      <section className="relative px-6 pt-32 pb-20 text-center">
        {/* Background Glimmer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-nebula/5 blur-[100px] rounded-full -z-10" />
        
        <div className="container max-w-4xl mx-auto space-y-8">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <PoweredByCodeSage variant="badge" />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white font-jakarta">
              The mission <span className="text-gradient">we live for.</span>
            </h1>
            <p className="text-xl text-dust font-medium max-w-2xl mx-auto leading-relaxed">
              HireForge was born from frustration: brilliant people losing to ATS bots. 
              We're rewriting the rules of technical hiring.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
               <Users className="h-4 w-4 text-nebula" />
               <span className="text-xs font-bold uppercase tracking-widest text-starlight/70">50,000+ Users</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
               <Zap className="h-4 w-4 text-aurora" />
               <span className="text-xs font-bold uppercase tracking-widest text-starlight/70">+31 Avg Score Lift</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Mission Statement ═══ */}
      <section className="py-24 px-6 relative">
        <div className="container max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nebula/10 text-nebula border border-nebula/20 text-xs font-black uppercase tracking-[0.2em]">
              <Heart className="h-3 w-3 fill-current" /> Our Core Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white font-jakarta leading-tight tracking-tight">
               Every great candidate deserves a <span className="text-gradient">fair shot.</span>
            </h2>
            <p className="text-lg text-dust font-medium leading-relaxed">
              75% of resumes are rejected by ATS before a human ever sees them. That's not a skills problem — it's a technical formatting problem. 
              <br /><br />
              HireForge gives every job seeker the same insider knowledge that expensive career coaches charge hundreds for. We’re democratizing the job hunt.
            </p>
            
            <div className="flex gap-4">
              <MagneticButton onClick={() => navigate("/register")} variant="gradient" className="h-12 px-8 font-bold text-sm">
                Join the Mission
              </MagneticButton>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <GlassCard index={0} glowColor="nebula">
                <div className="p-6 space-y-4">
                   <Cpu className="h-8 w-8 text-nebula" />
                   <h3 className="font-bold text-white">AI-Analysis</h3>
                   <p className="text-sm text-dust/80 font-medium leading-relaxed">Simulate exact ATS behavior with our proprietary NLP engine.</p>
                </div>
             </GlassCard>
             <GlassCard index={1} glowColor="aurora">
                <div className="p-6 space-y-4">
                   <Target className="h-8 w-8 text-aurora" />
                   <h3 className="font-bold text-white">JD Targeting</h3>
                   <p className="text-sm text-dust/80 font-medium leading-relaxed">Semantic gap analysis for every job description you find.</p>
                </div>
             </GlassCard>
             <div className="sm:col-span-2">
                <GlassCard index={2} glowColor="cyan">
                   <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 mb-1">
                         <Globe className="h-6 w-6 text-cyan" />
                         <span className="font-bold text-white">Open & Accessible</span>
                      </div>
                      <p className="text-sm text-dust/80 font-medium leading-relaxed">
                        We're funded by the CodeSage ecosystem, meaning HireForge is free for everyone, forever. No credit cards, no tiers, no bullshit.
                      </p>
                   </div>
                </GlassCard>
             </div>
          </div>
        </div>
      </section>

      {/* ═══ The Story Section ═══ */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
         <div className="container max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
               <h2 className="text-3xl md:text-5xl font-black text-white font-jakarta tracking-tight">The CodeSage Blueprint</h2>
               <p className="text-xl text-dust font-medium">Why a code review AI built a career engine.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <p className="text-lg text-dust font-medium leading-relaxed">
                     CodeSage started as an AI code reviewer — helping developers write cleaner, more efficient code. 
                     But we kept hearing the same story: great developers, terrible outcomes. 
                     Not because they couldn't code, but because their resumes were invisible to the system.
                  </p>
                  <p className="text-lg text-dust font-medium leading-relaxed italic border-l-2 border-nebula pl-6">
                     "We realized we had the NLP expertise to fix this. So we built HireForge — and made it free, because that's who we are."
                  </p>
               </div>
               
               <div className="space-y-4">
                  <GlassCard index={0} levitate={false}>
                     <div className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-nebula/10 text-nebula"><Code2 className="h-6 w-6" /></div>
                        <div>
                           <div className="font-bold text-white">CodeSage</div>
                           <div className="text-xs font-medium text-dust/70">Analyzes your codebase</div>
                        </div>
                     </div>
                  </GlassCard>
                  <GlassCard index={1} levitate={false}>
                     <div className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-cyan/10 text-cyan"><Briefcase className="h-6 w-6" /></div>
                        <div>
                           <div className="font-bold text-white">HireForge</div>
                           <div className="text-xs font-medium text-dust/70">Analyzes your career trajectory</div>
                        </div>
                     </div>
                  </GlassCard>
               </div>
            </div>
         </div>
      </section>

      {/* ═══ Roadmap/Timeline ═══ */}
      <section className="py-24 px-6 relative">
         <div className="container max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-3">
               <h2 className="text-4xl font-black text-white font-jakarta tracking-tight">Our Journey</h2>
               <p className="text-lg text-dust font-medium">From hackathon project to 50,000+ users.</p>
            </div>

            <div className="space-y-4">
               {milestones.map((m, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="group"
                  >
                     <GlassCard index={i} glowColor={i === 4 ? "aurora" : "nebula"} levitate={false}>
                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
                           <div className="w-24 shrink-0 text-center px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-sm font-black text-white font-space tracking-tight group-hover:bg-nebula transition-colors duration-500">
                             {m.year}
                           </div>
                           <div className="space-y-1">
                              <h3 className="text-xl font-bold text-white font-jakarta">{m.title}</h3>
                              <p className="text-dust font-medium leading-relaxed">{m.desc}</p>
                           </div>
                        </div>
                     </GlassCard>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ═══ Ready CTA ═══ */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nebula/5 blur-[120px] rounded-full -z-10" />
        
        <div className="container max-w-3xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <Zap className="h-12 w-12 text-nebula mx-auto mb-4 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black text-white font-jakarta tracking-tight">
               Build your <br />
               <span className="text-gradient">future today.</span>
            </h2>
            <p className="text-xl text-dust font-medium">
               Join 50,000+ job seekers who've used HireForge to land their dream technical roles.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton size="lg" variant="gradient" className="h-14 px-10 font-bold" onClick={() => navigate("/register")}>
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
            <MagneticButton size="lg" variant="glass" className="h-14 px-10 font-bold border-white/10" onClick={() => navigate("/how-it-works")}>
              How It Works
            </MagneticButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
