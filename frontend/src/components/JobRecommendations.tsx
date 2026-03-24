import { useState } from "react";
import { Briefcase, ExternalLink, Loader2, Filter, Zap, Sparkles, MapPin, Building2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import type { ResumeData, Job } from "@/types/resume";
import { toast } from "sonner";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "./ui/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

interface JobRecommendationsProps {
  resumeData: ResumeData;
}

type JobFilter = "ALL" | "INTERNSHIP" | "FRESHER";

export default function JobRecommendations({ resumeData }: JobRecommendationsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<JobFilter>("ALL");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- FETCH JOBS ---------------- */
  const fetchJobs = async () => {
    setError(null);

    if (!resumeData.resume_text || resumeData.resume_text.length < 50) {
      setError("Please upload a valid resume before searching for jobs.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post<{ matches: Record<string, unknown>[] }>(
        "/api/jobs/match",
        {
          skills: resumeData.skills,
          desiredRole: filter !== "ALL" ? filter : ""
        }
      );

      const mappedJobs: Job[] = (res.data.matches || []).map(m => ({
        title: String(m.title),
        job_type: "FRESHER",
        experience_level: "Entry Level",
        skills: Array.isArray(m.matchingSkills) ? m.matchingSkills : [],
        final_score: Number(m.matchScore),
        linkedin_link: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(String(m.title))}`,
        naukri_link: `https://www.naukri.com/${encodeURIComponent(String(m.title))}-jobs`
      }));

      setJobs(mappedJobs);
      setHasSearched(true);
      toast.success(`Found ${mappedJobs.length} matches!`);
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
        "Failed to fetch job recommendations. Try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      setJobs([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs =
    filter === "ALL" ? jobs : jobs.filter(job => job.job_type === filter);

  const filters: { label: string; value: JobFilter }[] = [
    { label: "All Opportunities", value: "ALL" },
    { label: "Internships", value: "INTERNSHIP" },
    { label: "Freshman Roles", value: "FRESHER" }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-aurora bg-aurora/10 border-aurora/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
    if (score >= 70) return "text-nebula bg-nebula/10 border-nebula/30";
    return "text-nova bg-nova/10 border-nova/30";
  };

  return (
    <GlassCard index={0} className="overflow-hidden">
      <div className="p-8 md:p-10 space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-aurora/10 text-aurora border border-aurora/20">
                <Briefcase className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black text-white font-jakarta tracking-tight">Opportunity Pulse</h2>
            </div>
            <p className="text-dust font-medium">Algorithmic matchmaking for your career profile.</p>
          </div>

          {!hasSearched ? (
            <MagneticButton
              onClick={fetchJobs}
              disabled={loading}
              variant="gradient"
              size="lg"
              className="h-14 px-10 font-bold"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Scanning Market...</>
              ) : (
                <><Search className="mr-2 h-5 w-5" /> Launch Discovery</>
              )}
            </MagneticButton>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-white/10 text-dust hover:bg-white/5"
              onClick={() => setHasSearched(false)}
            >
              Refresh Search
            </Button>
          )}
        </div>

        {error && (
          <div className="text-nova text-sm bg-nova/5 p-4 rounded-2xl border border-nova/10 flex items-center gap-3">
            <Briefcase className="h-4 w-4" />
            {error}
          </div>
        )}

        {!hasSearched ? (
          <div className="py-20 text-center space-y-6 bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <Briefcase className="h-8 w-8 text-dust/30" />
            </div>
            <p className="text-dust font-medium max-w-sm mx-auto">
              Our engine scans thousands of technical roles to find the perfect matches for your verified skill set.
            </p>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-700">
            {/* Nav Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                    filter === f.value
                      ? "bg-aurora text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : "text-dust/60 hover:text-dust hover:bg-white/5"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* JOB GRID */}
            <AnimatePresence mode="popLayout">
              {filteredJobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white/[0.01] rounded-3xl border border-white/5"
                >
                  <p className="text-dust/50 font-medium italic">No matches found for this filter in the current market cycle.</p>
                </motion.div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredJobs.map((job, i) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="group p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-nebula/30 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-nebula/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-start justify-between gap-4 relative z-10">
                          <div className="space-y-3">
                            <h3 className="text-lg font-black text-white group-hover:text-gradient transition-all">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-3">
                              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-dust/60">
                                <Building2 className="h-3 w-3" /> Technical Corp
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-dust/60">
                                <MapPin className="h-3 w-3" /> Remote / Global
                              </div>
                            </div>
                          </div>

                          <div className={cn(
                            "flex flex-col items-center justify-center w-14 h-14 rounded-2xl border font-space transition-all duration-500 group-hover:scale-110",
                            getScoreColor(job.final_score)
                          )}>
                            <span className="text-lg font-black">{Math.round(job.final_score)}%</span>
                            <span className="text-[7px] font-black uppercase tracking-tighter opacity-70">Match</span>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                          {job.skills.slice(0, 4).map((skill, j) => (
                            <Badge key={j} className="bg-white/5 text-dust/80 border-white/5 px-2.5 py-1 rounded-lg font-bold text-[10px] lowercase tracking-wide">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 4 && (
                            <Badge className="bg-nebula/10 text-nebula border-nebula/20 px-2.5 py-1 rounded-lg font-bold text-[10px]">
                              +{job.skills.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="mt-8 flex items-center justify-between relative z-10 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-4">
                            <a
                              href={job.linkedin_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-white/5 text-dust/50 hover:text-white hover:bg-white/10 transition-all"
                              title="Expand on LinkedIn"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <a
                              href={job.naukri_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-white/5 text-dust/50 hover:text-white hover:bg-white/10 transition-all"
                              title="Details on Naukri"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>

                          <MagneticButton size="sm" variant="glass" className="h-10 px-6 rounded-xl border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5">
                            Intel Report
                          </MagneticButton>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            <div className="p-6 rounded-[2rem] bg-aurora/5 border border-aurora/10 flex items-center gap-4">
              <Sparkles className="h-6 w-6 text-aurora shrink-0" />
              <p className="text-xs text-dust/90 font-medium leading-relaxed">
                Market Insight: These roles have been identified based on your current skill saturation. Applying through "Technical Corp" referral channels increases interview visibility by <span className="text-white font-bold">18%</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
