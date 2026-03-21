import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Sparkles, Loader2, CheckCircle2, ChevronRight, Info, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/ui/score-ring";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import type { ResumeData, ATSResult } from "@/types/resume";
import { toast } from "sonner";
import GlassCard from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";

interface ATSScoreProps {
  resumeData: ResumeData;
}

export default function ATSScore({ resumeData }: ATSScoreProps) {
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const calculateATS = async () => {
    if (!resumeData.resume_text || resumeData.resume_text.length < 50) {
      toast.error("Please upload a valid resume first.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post<{ score: ATSResult }>("/api/evaluate", {
        resumeText: resumeData.resume_text,
        skills: resumeData.skills,
        experience: resumeData.experience
      });
      setResult(res.data.score);
      toast.success("ATS Analysis complete!");
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
        "Failed to analyze ATS score.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-aurora bg-aurora/10 border-aurora/30";
    if (score >= 60) return "text-nebula bg-nebula/10 border-nebula/30";
    return "text-nova bg-nova/10 border-nova/30";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-aurora";
    if (score >= 60) return "bg-nebula";
    return "bg-nova";
  };

  return (
    <GlassCard index={0} className="overflow-hidden">
      <div className="p-8 md:p-10 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <div className="p-2.5 rounded-xl bg-nebula/10 text-nebula border border-nebula/20">
                    <Target className="h-6 w-6" />
                 </div>
                 <h2 className="text-2xl font-black text-white font-jakarta tracking-tight">ATS Analysis</h2>
              </div>
              <p className="text-dust font-medium">In-depth 20-parameter performance benchmark.</p>
           </div>
           
           {!result && (
              <MagneticButton
                onClick={calculateATS}
                disabled={loading}
                variant="gradient"
                size="lg"
                className="h-14 px-10 font-bold"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</>
                ) : (
                  <><Zap className="mr-2 h-5 w-5" /> Run Intelligence Engine</>
                )}
              </MagneticButton>
           )}
        </div>

        {!result ? (
          <div className="py-20 text-center space-y-6 bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
               <Target className="h-8 w-8 text-dust/30" />
            </div>
            <p className="text-dust font-medium max-w-sm mx-auto">
              Get an expert analysis of your resume formatting, keywords, and content quality using our proprietary career engine.
            </p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            {/* Score Ring Section */}
            <div className="flex flex-col items-center justify-center py-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-nebula/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px]" />
              
              <div className="relative z-10 scale-125 md:scale-150 py-8">
                 <ScoreRing score={result.ats_score} size="lg" />
              </div>
              
              <div className="relative z-10 text-center space-y-2 mt-12">
                 <h3 className={cn(
                   "text-3xl font-black font-jakarta tracking-tight",
                   result.ats_score >= 80 ? "text-aurora" :
                     result.ats_score >= 60 ? "text-nebula" : "text-nova"
                 )}>
                   {result.ats_score >= 80 ? "Elite Performance" :
                     result.ats_score >= 60 ? "Strong Baseline" : "Optimization Required"}
                 </h3>
                 <p className="text-dust font-medium">
                   Your resume outperforms <span className="text-white font-bold">{result.ats_score - 10}%</span> of candidates in this category.
                 </p>
              </div>
            </div>

            {/* Breakdown & Suggestions Grid */}
            <div className="grid lg:grid-cols-2 gap-10">
               
               {/* Detailed Breakdown */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <h3 className="text-xl font-bold text-white font-jakarta">Technical Breakdown</h3>
                     <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 text-dust px-2 py-0.5 rounded-full border border-white/10">20 Parameters</span>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {result.detailed_breakdown?.map((cat, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`} className="border-0 bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden px-5">
                        <AccordionTrigger className="hover:no-underline py-5 group">
                          <div className="flex items-center justify-between w-full pr-4 text-left">
                            <span className="font-bold text-starlight group-hover:text-white transition-colors">{cat.category}</span>
                            <span className={cn("text-xs font-black px-3 py-1 rounded-full border tracking-tighter", getScoreColor(cat.score))}>
                               {cat.score}%
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 space-y-6">
                          {cat.subParameters.map((param, pIdx) => (
                            <div key={pIdx} className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-dust/90 flex items-center gap-2">
                                  {param.score >= 80 ? (
                                    <CheckCircle2 className="h-4 w-4 text-aurora" />
                                  ) : (
                                    <Info className="h-4 w-4 text-nebula" />
                                  )}
                                  {param.name}
                                </span>
                                <span className="text-xs font-black text-white">{param.score}%</span>
                              </div>
                              <Progress value={param.score} className="h-1.5 bg-white/5" indicatorClassName={getProgressColor(param.score)} />
                              {param.score < 80 && (
                                <motion.p 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-[11px] text-dust italic pl-6 leading-relaxed"
                                >
                                  {param.feedback}
                                </motion.p>
                              )}
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
               </div>

               {/* Strategic Suggestions */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <h3 className="text-xl font-bold text-white font-jakarta">Strategic Intel</h3>
                     <Sparkles className="h-5 w-5 text-nebula animate-pulse" />
                  </div>

                  <div className="space-y-4">
                    {result.suggestions.map((s, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-start gap-4 p-5 rounded-2xl bg-nebula/5 border border-nebula/10 hover:bg-nebula/10 hover:border-nebula/20 transition-all duration-300"
                      >
                        <div className="mt-1 p-1.5 rounded-xl bg-nebula/20 text-nebula shrink-0 group-hover:scale-110 transition-transform">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <p className="text-sm text-dust/90 font-medium leading-relaxed">{s}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="pt-8 space-y-4">
                     <MagneticButton
                       onClick={() => navigate("/rewrite", {
                         state: {
                           resumeText: resumeData.resume_text,
                           suggestions: result?.suggestions || [],
                         }
                       })}
                       className="w-full h-14 rounded-2xl font-bold"
                       variant="gradient"
                     >
                       <Sparkles className="mr-2 h-5 w-5" /> Rewrite with Engine AI
                     </MagneticButton>
                     <Button
                       onClick={calculateATS}
                       disabled={loading}
                       variant="outline"
                       className="w-full h-14 rounded-2xl border-white/10 text-dust font-bold hover:bg-white/5"
                     >
                       <Target className="mr-2 h-5 w-5" /> Recalibrate Analysis
                     </Button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
}
