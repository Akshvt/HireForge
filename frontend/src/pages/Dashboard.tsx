import { useAuthStore } from "@/store/authStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ResumeUpload from "@/components/ResumeUpload";
import ATSScore from "@/components/ATSScore";
import JobRecommendations from "@/components/JobRecommendations";
import CareerPath from "@/components/CareerPath";
import ResumeHistory from "@/components/ResumeHistory";
import { useState, useEffect, useRef } from "react";
import type { ResumeData } from "@/types/resume";
import { FileText, Award, Briefcase, Zap } from "lucide-react";
import JDTargeting from "@/components/JDTargeting";
import api from "@/services/api";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

/* ── Animated counter hook ── */
function useAnimatedCounter(target: string, duration = 1200) {
  const [display, setDisplay] = useState("0");
  const prevTarget = useRef(target);

  useEffect(() => {
    prevTarget.current = target;
    const numericMatch = target.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplay(target);
      return;
    }

    const suffix = target.replace(numericMatch[0], "");
    const end = parseFloat(numericMatch[0]);
    const isFloat = numericMatch[0].includes(".");
    const start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(
        (isFloat ? current.toFixed(1) : Math.round(current).toString()) + suffix
      );
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return display;
}

/* ── Stat Card Content ── */
function StatCardContent({
  stat,
}: {
  stat: { label: string; value: string; icon: React.ElementType; glowColor: string };
}) {
  const animatedValue = useAnimatedCounter(stat.value);

  return (
    <div className="p-5 flex flex-col gap-3 group">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-xl bg-${stat.glowColor}/10 border border-${stat.glowColor}/20 animate-icon-pulse`}>
          <stat.icon className={`h-4 w-4 text-${stat.glowColor}`} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold font-jakarta text-white group-hover:text-nebula transition-all duration-300">{animatedValue}</p>
        <p className="text-xs text-dust font-medium mt-0.5 uppercase tracking-wider">{stat.label}</p>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [statsData, setStatsData] = useState({
    totalResumes: 0,
    averageAts: "0%",
    jobMatchesCount: 0,
    aiRewritesCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get<{
          totalResumes: number;
          averageAts: string;
          jobMatchesCount: number;
          aiRewritesCount: number;
        }>('/api/resumes/stats');
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, [resumeData]);

  const isResumeUploaded = resumeData && resumeData.resume_text.length > 0;

  const stats = [
    {
      label: "Analyzed Resumes",
      value: statsData.totalResumes.toString(),
      icon: FileText,
      glowColor: "nebula",
    },
    {
      label: "Average Match",
      value: statsData.averageAts,
      icon: Award,
      glowColor: "aurora",
    },
    {
      label: "Open Roles",
      value: statsData.jobMatchesCount.toString(),
      icon: Briefcase,
      glowColor: "cyan",
    },
    {
      label: "AI Enhancements",
      value: statsData.aiRewritesCount.toString(),
      icon: Zap,
      glowColor: "nova",
    },
  ];

  return (
    <main className="min-h-screen pb-20 overflow-x-hidden">
      {/* ═══ Dashboard Header ═══ */}
      <section className="relative pt-12 pb-16 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-nebula/5 blur-[100px] -z-10" />
        <div className="container max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-white font-jakarta tracking-tight">
                Welcome, <span className="text-gradient">{user?.name}</span>
              </h1>
              <p className="text-lg text-dust font-medium">Your career command center is ready.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-aurora animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-starlight/70">Engine Status: Optimal</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-6 space-y-10">
        {/* ═══ Stats Carousel / Grid ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <GlassCard
              key={i}
              index={i}
              levitate={true}
              tilt={true}
              glowColor={stat.glowColor as any}
            >
              <StatCardContent stat={stat} />
            </GlassCard>
          ))}
        </div>

        {/* ═══ Main Interaction Area ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Tools & Analysis */}
          <div className="lg:col-span-8 space-y-10 order-2 lg:order-1">
            
            {/* Analysis Tabs */}
            {isResumeUploaded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <Tabs defaultValue="ats" className="w-full">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-bold text-white font-jakarta">Intelligence Suite</h2>
                     <TabsList className="bg-white/[0.03] border border-white/5 rounded-2xl p-1.5 h-auto">
                        {[
                          { value: "ats", label: "Analysis" },
                          { value: "jd", label: "Targeting" },
                          { value: "jobs", label: "Roles" },
                          { value: "career", label: "Path" },
                        ].map((tab) => (
                          <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="rounded-xl px-5 py-2 text-sm font-bold text-dust data-[state=active]:bg-nebula data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-nebula/20 transition-all"
                          >
                            {tab.label}
                          </TabsTrigger>
                        ))}
                     </TabsList>
                  </div>

                  <div className="relative">
                    <TabsContent value="ats" className="mt-0 focus-visible:outline-none">
                      <ATSScore resumeData={resumeData} />
                    </TabsContent>
                    <TabsContent value="jd" className="mt-0 focus-visible:outline-none">
                      <JDTargeting resumeData={resumeData} />
                    </TabsContent>
                    <TabsContent value="jobs" className="mt-0 focus-visible:outline-none">
                      {resumeData.skills.length > 0 ? (
                        <JobRecommendations resumeData={resumeData} />
                      ) : (
                        <GlassCard index={0}>
                           <div className="p-12 text-center text-dust italic font-medium">
                              Skill extraction failed. Please re-upload your resume.
                           </div>
                        </GlassCard>
                      )}
                    </TabsContent>
                    <TabsContent value="career" className="mt-0 focus-visible:outline-none">
                      {resumeData.skills.length > 0 ? (
                        <CareerPath resumeData={resumeData} />
                      ) : (
                         <GlassCard index={0}>
                            <div className="p-12 text-center text-dust italic font-medium">
                               Skill extraction failed. Please re-upload your resume.
                            </div>
                         </GlassCard>
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </motion.div>
            ) : (
              /* Initial Upload State - Prominent */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-6">
                   <h2 className="text-2xl font-black text-white font-jakarta tracking-tight">Upload Resume</h2>
                   <p className="text-dust font-medium">Start by uploading your current resume for engine analysis.</p>
                </div>
                <ResumeUpload onParsed={setResumeData} resumeData={resumeData} />
              </motion.div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-8 order-1 lg:order-2">
            
            {/* Re-upload / Current Resume Context (if uploaded) */}
            {isResumeUploaded && (
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
               >
                  <GlassCard index={0} glowColor="aurora">
                     <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                           <h3 className="font-bold text-white">Active Profile</h3>
                           <div className="text-[10px] font-black uppercase tracking-widest text-aurora bg-aurora/10 px-2 py-0.5 rounded-full border border-aurora/20">Analyzed</div>
                        </div>
                        <ResumeUpload onParsed={setResumeData} resumeData={resumeData} />
                     </div>
                  </GlassCard>
               </motion.div>
            )}

            {/* History Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ResumeHistory />
            </motion.div>

            {/* Premium Tip Card */}
            <GlassCard index={1} glowColor="cyan">
               <div className="p-6 space-y-4">
                  <div className="p-2 rounded-lg bg-cyan/10 text-cyan w-fit">
                     <Zap className="h-4 w-4" />
                  </div>
                  <h4 className="font-bold text-white">Pro Tip</h4>
                  <p className="text-sm text-dust font-medium leading-relaxed">
                     Users with an ATS score of <span className="text-starlight font-bold">85+</span> are 4x more likely to secure interviews at Tier-1 companies.
                  </p>
               </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
