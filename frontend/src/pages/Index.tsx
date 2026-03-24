import { useNavigate } from "react-router-dom";
import { ArrowRight, Award, CheckCircle2, Code2, FileText, Star, Target, TrendingUp, Zap } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";

const testimonials = [
  {
    name: "Siddharth Rao",
    title: "Software Engineer → Senior SWE at Atlassian",
    avatar: "S",
    avatarColor: "from-nebula to-cyan",
    quote: "I was applying for 6 months with no callbacks. HireForge showed my ATS score was 43 — embarrassingly low. After following the suggestions for one afternoon, it jumped to 91. Got 3 interview calls within 2 weeks. Atlassian offer came 5 weeks later.",
    metric: "ATS: 43 → 91",
    metricColor: "text-aurora",
  },
  {
    name: "Meera Krishnamurthy",
    title: "Marketing Analyst → Product Manager at Swiggy",
    avatar: "M",
    avatarColor: "from-nebula to-nova",
    quote: "I was trying to break into product management with a marketing background. The JD Targeting feature showed me exactly which PM keywords I needed to add to highlight transferable experience. Completely changed how I framed my resume. Landed a PM role in 3 weeks.",
    metric: "Callback rate: 3× increase",
    metricColor: "text-cyan",
  },
  {
    name: "James Okoye",
    title: "CS Graduate → Backend Engineer at Razorpay",
    avatar: "J",
    avatarColor: "from-aurora to-cyan",
    quote: "As a fresh grad, I had no idea what recruiters even looked for. HireForge was like having a senior dev review my resume. The AI suggestions reworked my project bullets to actually quantify impact. Got 5 interviews and 2 offers. Accepted Razorpay. Couldn't have done it without this.",
    metric: "5 interviews, 2 offers",
    metricColor: "text-nebula",
  },
  {
    name: "Pratha Joshi",
    title: "Full Stack Developer at Notion",
    avatar: "P",
    avatarColor: "from-amber-500 to-nova",
    quote: "I was using ResumeWorded's free tier and paying $29/month for the premium. HireForge gives me more — the JD targeting is genuinely better, and the career path feature showed me skills I needed to invest in for my next role. Cancelled ResumeWorded immediately.",
    metric: "Saved $348/year",
    metricColor: "text-aurora",
  },
  {
    name: "Aryan Kapoor",
    title: "Data Scientist at PhonePe",
    avatar: "A",
    avatarColor: "from-nova to-nebula",
    quote: "What I love is how specific the feedback is. Not 'add more keywords' but 'add Spark, MLflow, and A/B testing — these appear 8 times in this JD and 0 times in your resume.' That level of detail at zero cost is insane. Improved ATS score from 62 to 94 in one week.",
    metric: "ATS: 62 → 94 in 1 week",
    metricColor: "text-aurora",
  },
  {
    name: "Divya Nambiar",
    title: "DevOps Engineer at Zepto",
    avatar: "D",
    avatarColor: "from-cyan to-aurora",
    quote: "Already using CodeSage for code reviews at work. When HireForge dropped from the same team, I knew it would be good. It did not disappoint. Went from 71 to 89 ATS score, and the job matching found a DevOps role I hadn't seen on other platforms. Joined Zepto 6 weeks later.",
    metric: "ATS: 71 → 89",
    metricColor: "text-aurora",
  },
];

const features = [
  {
    icon: Target,
    title: "ATS Optimizer",
    description: "Score your resume against 20+ parameters used by real ATS systems. Get line-by-line fixes.",
    glowColor: "nebula" as const,
    iconBg: "from-nebula/80 to-nebula/40",
  },
  {
    icon: FileText,
    title: "JD Targeting",
    description: "Compare your resume against any job description. Find missing keywords and close the gap instantly.",
    glowColor: "aurora" as const,
    iconBg: "from-aurora/80 to-aurora/40",
  },
  {
    icon: Zap,
    title: "Smart Matching",
    description: "Instantly discover and apply to jobs that match your skills — not just your title.",
    glowColor: "cyan" as const,
    iconBg: "from-cyan/80 to-cyan/40",
  },
];

/* ── Scroll-triggered section wrapper ── */
const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay }}
    >
      {children}
    </motion.div>
  );
};

/* ── Animated ATS Score Demo ── */
const ATSScoreDemo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="glass-panel-strong rounded-3xl p-6 space-y-4"
      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.3 }}
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 80px rgba(99,102,241,0.08)" }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs text-dust font-mono-jb uppercase tracking-wider">ATS Score</p>
          <div className="flex items-baseline gap-2">
            <motion.span
              className="text-5xl font-black text-aurora font-space"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 }}
            >
              94
            </motion.span>
            <span className="text-sm text-aurora flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3" /> +32
            </span>
          </div>
        </div>
        <Award className="h-10 w-10 text-aurora/20" />
      </div>
      <div className="space-y-3">
        {[
          { label: "Keywords", val: 94, color: "from-nebula to-cyan" },
          { label: "Formatting", val: 100, color: "from-aurora to-cyan" },
          { label: "Impact", val: 88, color: "from-nebula to-aurora" },
        ].map((s, i) => (
          <div key={s.label} className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-dust">{s.label}</span>
              <span className="font-medium text-starlight font-mono-jb">{s.val}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${s.color} rounded-full`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${s.val}%` } : { width: 0 }}
                transition={{ duration: 1, delay: 0.8 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col gap-0 pb-0 overflow-x-hidden">
      {/* ═══ Hero Section ═══ */}
      <section ref={heroRef} className="relative px-4 pt-32 pb-40 text-center md:pt-44 md:pb-60">
        {/* Advanced Background Gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0,transparent_60%)] opacity-50 pointer-events-none" />
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0,transparent_60%)] pointer-events-none" />
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0,transparent_60%)] pointer-events-none" />
        </div>

        <motion.div
          className="container max-w-5xl mx-auto space-y-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-bold uppercase tracking-[0.2em] text-cyan hover:bg-white/[0.06] transition-all cursor-default group">
              <Zap className="h-3.5 w-3.5 fill-cyan group-hover:animate-pulse" />
              <span>Version 2.0 is Live</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tight text-starlight leading-[0.95] md:leading-[1.1] font-jakarta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
          >
            Forge a Career <br />
            <span className="text-gradient text-glow tracking-tighter">Without Limits.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-dust max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.35 }}
          >
            The world's most advanced AI resume ecosystem. 
            Optimize for ATS, target top companies, and leapfrog the competition — 100% free.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-5 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.5 }}
          >
            <MagneticButton
              variant="gradient"
              size="lg"
              onClick={() => navigate("/register")}
              className="h-14 px-10 text-base font-bold shadow-xl shadow-nebula/20"
            >
              Start Forging Free <ArrowRight className="h-5 w-5 ml-2" />
            </MagneticButton>
            <MagneticButton
              variant="glass"
              size="lg"
              onClick={() => navigate("/how-it-works")}
              className="h-14 px-8 text-base font-medium border-starlight/10 hover:bg-black/5 dark:hover:bg-white/5"
            >
              See the Engine
            </MagneticButton>
          </motion.div>


        </motion.div>
      </section>

      {/* ═══ Features Grid — Premium Design ═══ */}
      <section className="container max-w-6xl mx-auto px-6 -mt-24 relative z-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <GlassCard
              key={f.title}
              index={i}
              levitate={true}
              tilt={true}
              shimmer={true}
            >
              <div className="p-10 space-y-6 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,var(--${f.glowColor}-rgba)_0,transparent_70%)] -translate-y-1/2 translate-x-1/2 transition-all opacity-20`} />
                
                <motion.div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${f.iconBg} w-fit shadow-lg shadow-black/20`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <f.icon className="h-7 w-7 text-white" />
                </motion.div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-starlight font-jakarta">{f.title}</h3>
                  <p className="text-dust leading-relaxed font-medium">{f.description}</p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-sm font-bold text-cyan opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  Read more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>


      {/* ═══ Stats / Social Proof ═══ */}
      <RevealSection className="py-32 bg-surface-deep/50 border-y border-white/5 relative">
        <div className="container max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-starlight font-jakarta leading-tight">
              More than just a <br />
              <span className="text-gradient">resume builder.</span>
            </h2>
            <p className="text-lg text-dust font-medium leading-relaxed max-w-lg">
              We've analyzed millions of data points to find exactly what makes a candidate stand out in today's brutal market.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {[
                { label: "Resumes Analyzed", val: "2.4M+" },
                { label: "Interviews Secured", val: "850K+" },
                { label: "Success Rate", val: "94%" },
                { label: "User Rating", val: "4.9/5" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-3xl font-black text-starlight font-space">{stat.val}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-dust">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="pt-6">
               <MagneticButton variant="glass" size="sm" className="h-11 px-6 font-bold border-white/5 hover:bg-white/5" onClick={() => navigate("/about")}>
                  The HireForge Story <ArrowRight className="h-4 w-4 ml-2" />
               </MagneticButton>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_60%)] opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none" />
            <ATSScoreDemo />
          </div>
        </div>
      </RevealSection>

      {/* ═══ Testimonials — Horizontal Flow ═══ */}
      <RevealSection className="py-40 px-6">
        <div className="container max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-starlight font-jakarta tracking-tight">The developer standard.</h2>
            <p className="text-xl text-dust max-w-2xl mx-auto font-medium leading-relaxed">
              Don't take our word for it. Thousands of engineers from Google, Amazon, and Stripe use HireForge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <GlassCard
                key={t.name}
                index={i}
                tilt={true}
              >
                <div className="p-8 space-y-6 flex flex-col h-full group">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(j => (
                      <Star key={j} className="h-4 w-4 fill-aurora text-aurora animate-pulse" style={{ animationDelay: `${j * 0.1}s` }} />
                    ))}
                  </div>
                  <p className="text-base text-starlight/90 leading-relaxed flex-1 font-medium italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${t.avatarColor} border border-white/10 flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                      {t.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-starlight truncate">{t.name}</p>
                      <p className="text-xs font-bold text-dust uppercase tracking-wider truncate">{t.title}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══ CTA Section — Massive Centerpiece ═══ */}
      <RevealSection className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nebula/5 to-transparent pointer-events-none" />
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-10 relative">
          <motion.div 
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-nebula to-cyan mx-auto mb-12 shadow-2xl shadow-nebula/40 flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="h-10 w-10 text-white fill-current" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-starlight font-jakarta tracking-tight">Your next chapter <br /><span className="text-gradient">starts here.</span></h2>
          <p className="text-xl text-dust font-medium max-w-xl mx-auto leading-relaxed">
            Stop guessing. Start forging. Join 50,000+ developers winning the career game.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <MagneticButton
              variant="gradient"
              size="lg"
              onClick={() => navigate("/register")}
              className="h-16 px-12 text-lg font-black shadow-2xl shadow-nebula/30 w-full sm:w-auto"
            >
              Analyze Resume Free
            </MagneticButton>
            <MagneticButton
              variant="glass"
              size="lg"
              onClick={() => navigate("/faq")}
              className="h-16 px-10 text-lg font-bold border-white/5 hover:bg-white/5 w-full sm:w-auto"
            >
              Have Questions?
            </MagneticButton>
          </div>
          
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground pt-4">No credit card required. Ever.</p>
        </div>
      </RevealSection>
    </div>
  );
};

export default Index;
