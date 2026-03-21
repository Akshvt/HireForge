import { useState } from "react";
import {
  TrendingUp,
  ExternalLink,
  Loader2,
  BookOpen,
  Check,
  ChevronRight,
  ArrowRight,
  Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { toast } from "sonner";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "./ui/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

import type { ResumeData } from "@/types/resume";

/* ---------- TYPES MATCH BACKEND ---------- */
type CareerStep = {
  current_role: string;
  next_role: string;
  missing_skills: string[];
  learning_resources: Record<
    string,
    {
      youtube?: string;
      coursera?: string;
      udemy?: string;
      gfg?: string;
      w3schools?: string;
    }
  >;
};

type CareerAPIResponse = {
  primary_path: CareerStep;
  tech_paths: CareerStep[];
  non_tech_paths: CareerStep[];
};

type ViewMode = "PRIMARY" | "TECH" | "NONTECH";

interface CareerPathProps {
  resumeData: ResumeData;
}

export default function CareerPath({ resumeData }: CareerPathProps) {
  const [data, setData] = useState<CareerAPIResponse | null>(null);
  const [view, setView] = useState<ViewMode>("PRIMARY");
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------- FETCH ---------- */
  const fetchCareer = async () => {
    setError(null);

    if (!resumeData?.skills?.length) {
      setError("Upload resume to get career guidance.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post<{ careerPath: CareerAPIResponse }>("/api/career/recommend", {
        skills: resumeData.skills
      });

      setData(res.data.careerPath);
      setView("PRIMARY");
      setProgress({});
      toast.success("Career Roadmap generated!");
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
        "Failed to generate career path. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- PROGRESS ---------- */
  const toggleSkill = (skill: string) => {
    setProgress(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  /* ---------- RENDER PATH ---------- */
  const renderPath = (path: CareerStep) => {
    const total = path.missing_skills.length;
    const completed = path.missing_skills.filter(s => progress[s]).length;
    const progressPercent = total === 0 ? 100 : Math.round((completed / total) * 100);

    const resources = [
      { key: "youtube", label: "YouTube", color: "text-red-400 group-hover:text-red-300" },
      { key: "coursera", label: "Coursera", color: "text-blue-400 group-hover:text-blue-300" },
      { key: "udemy", label: "Udemy", color: "text-purple-400 group-hover:text-purple-300" },
      { key: "gfg", label: "GFG", color: "text-emerald-400 group-hover:text-emerald-300" },
      { key: "w3schools", label: "W3", color: "text-cyan-400 group-hover:text-cyan-300" }
    ] as const;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10"
      >
        {/* Transition Header */}
        <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden group">
           <div className="absolute inset-0 bg-nebula/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl" />
           
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
              <div className="text-center md:text-left space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dust/50">Current Trajectory</p>
                 <p className="text-xl font-black text-starlight">{path.current_role}</p>
              </div>
              
              <div className="relative flex items-center justify-center p-3">
                 <div className="absolute inset-0 bg-nebula/10 rounded-full blur-xl animate-pulse" />
                 <ArrowRight className="h-8 w-8 text-nebula relative z-10" />
              </div>

              <div className="text-center md:text-left space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-aurora/70">Strategic Target</p>
                 <p className="text-xl font-black text-gradient">{path.next_role}</p>
              </div>

              <div className="md:ml-auto text-center md:text-right">
                 <div className="text-4xl font-black text-white font-space">{progressPercent}%</div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-dust/50">Readiness Score</p>
              </div>
           </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
           <div className="flex justify-between text-xs font-black uppercase tracking-widest text-dust/70">
              <span>Path Completion</span>
              <span className="text-nebula">{completed} / {total} Skills Verified</span>
           </div>
           <Progress value={progressPercent} className="h-3 bg-white/5" indicatorClassName="bg-gradient-to-r from-nebula via-cyan to-aurora" />
        </div>

        {/* Skills Grid */}
        <div className="space-y-5">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-dust/70 flex items-center gap-2 mb-6">
            <BookOpen className="h-4 w-4 text-nebula" />
            Knowledge Acquisition Pipeline
          </h4>

          {total === 0 ? (
            <GlassCard index={0} glowColor="aurora">
               <div className="p-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-aurora/10 flex items-center justify-center mx-auto mb-2 border border-aurora/20">
                     <Check className="h-8 w-8 text-aurora" />
                  </div>
                  <h3 className="text-xl font-black text-white">Algorithmically Optimized</h3>
                  <p className="text-dust font-medium max-w-sm mx-auto">
                    Your current skill profile matches 100% of the core requirements for this strategic role.
                  </p>
               </div>
            </GlassCard>
          ) : (
            <div className="grid gap-4">
               <AnimatePresence>
                  {path.missing_skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                       <div
                         className={cn(
                           "group p-6 rounded-2xl border transition-all duration-300",
                           progress[skill]
                             ? "bg-aurora/5 border-aurora/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                             : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                         )}
                       >
                         <div className="flex items-center gap-5">
                           <div className="relative flex items-center justify-center">
                              <Checkbox
                                checked={!!progress[skill]}
                                onCheckedChange={() => toggleSkill(skill)}
                                className={cn(
                                  "h-6 w-6 rounded-lg border-white/20 transition-all",
                                  progress[skill] ? "bg-aurora border-aurora" : "bg-white/5"
                                )}
                              />
                           </div>
                           <div className="flex-1">
                              <span
                                className={cn(
                                  "text-lg font-bold transition-all duration-300",
                                  progress[skill] ? "text-starlight/40 line-through" : "text-starlight group-hover:text-white"
                                )}
                              >
                                {skill}
                              </span>
                           </div>
                           
                           {!progress[skill] && (
                             <div className="hidden md:flex items-center gap-3">
                                {resources.map(r =>
                                  path.learning_resources[skill]?.[r.key] ? (
                                    <a
                                      key={r.key}
                                      href={path.learning_resources[skill][r.key]}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/link"
                                      title={`Learn on ${r.label}`}
                                    >
                                      <ExternalLink className={cn("h-4 w-4", r.color)} />
                                    </a>
                                  ) : null
                                )}
                             </div>
                           )}
                         </div>

                         {!progress[skill] && path.learning_resources?.[skill] && (
                           <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: "auto" }}
                             className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2"
                           >
                             <div className="md:hidden flex flex-wrap gap-2 w-full">
                                {resources.map(r =>
                                  path.learning_resources[skill]?.[r.key] ? (
                                    <a
                                      key={r.key}
                                      href={path.learning_resources[skill][r.key]}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={cn(
                                        "inline-flex items-center gap-2 text-[10px] px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 font-black uppercase tracking-wider",
                                        r.color
                                      )}
                                    >
                                      {r.label}
                                      <ExternalLink className="h-2 w-2" />
                                    </a>
                                  ) : null
                                )}
                             </div>
                           </motion.div>
                         )}
                       </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  /* ---------- UI ---------- */
  return (
    <GlassCard index={0} className="overflow-hidden">
      <div className="p-8 md:p-10 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 rounded-xl bg-cyan/10 text-cyan border border-cyan/20">
                    <TrendingUp className="h-6 w-6" />
                 </div>
                 <h2 className="text-2xl font-black text-white font-jakarta tracking-tight">Career Compass</h2>
              </div>
              <p className="text-dust font-medium">Algorithmic roadmap for professional advancement.</p>
           </div>
           
           {!data && (
              <MagneticButton
                onClick={fetchCareer}
                disabled={loading}
                variant="gradient"
                size="lg"
                className="h-14 px-10 font-bold"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Trajectories...</>
                ) : (
                  <><Zap className="mr-2 h-5 w-5" /> Generate Roadmap</>
                )}
              </MagneticButton>
           )}
        </div>

        {error && (
          <div className="text-nova text-sm bg-nova/5 p-4 rounded-2xl border border-nova/10 flex items-center gap-3">
             <TrendingUp className="h-4 w-4" />
             {error}
          </div>
        )}

        {!data ? (
          <div className="py-20 text-center space-y-6 bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
               <TrendingUp className="h-8 w-8 text-dust/30" />
            </div>
            <p className="text-dust font-medium max-w-sm mx-auto">
              Unlock personalized career paths and learning resources based on your current expertise and industry trends.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Nav Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit">
              {[
                { id: "PRIMARY", label: "Optimized Path" },
                { id: "TECH", label: "Tech Specialization" },
                { id: "NONTECH", label: "Leadership Orbit" }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setView(f.id as ViewMode)}
                  className={cn(
                    "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                    view === f.id 
                      ? "bg-nebula text-white shadow-[0_0_20px_rgba(109,40,217,0.3)]" 
                      : "text-dust/60 hover:text-dust hover:bg-white/5"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
               {view === "PRIMARY" && renderPath(data.primary_path)}
               {view === "TECH" &&
                 <div className="grid gap-12">
                   {data.tech_paths.map((p, i) => (
                     <div key={i}>{renderPath(p)}</div>
                   ))}
                 </div>
               }
               {view === "NONTECH" &&
                 <div className="grid gap-12">
                   {data.non_tech_paths.map((p, i) => (
                     <div key={i}>{renderPath(p)}</div>
                   ))}
                 </div>
               }
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
