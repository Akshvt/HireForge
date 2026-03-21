import { useState } from "react";
import { Target, Search, Loader2, CheckCircle2, XCircle, AlertCircle, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";
import api from "@/services/api";
import type { ResumeData, JDTargetingResult } from "@/types/resume";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "./ui/MagneticButton";
import { motion } from "framer-motion";

interface JDTargetingProps {
    resumeData: ResumeData;
}

export default function JDTargeting({ resumeData }: JDTargetingProps) {
    const [jdText, setJdText] = useState("");
    const [result, setResult] = useState<JDTargetingResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeGap = async () => {
        if (!jdText || jdText.length < 50) {
            setError("Please paste a job description with at least 50 characters.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const res = await api.post<{ analysis: JDTargetingResult }>("/api/jd/target", {
                resumeText: resumeData.resume_text,
                jobDescriptionText: jdText
            });
            setResult(res.data.analysis);
            toast.success("Analysis complete!");
        } catch (err: unknown) {
            const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
                "Failed to analyze JD gap. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassCard index={0} className="overflow-hidden">
            <div className="p-8 md:p-10 space-y-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="space-y-2">
                      <div className="flex items-center gap-3">
                         <div className="p-2.5 rounded-xl bg-aurora/10 text-aurora border border-aurora/20">
                            <Target className="h-6 w-6" />
                         </div>
                         <h2 className="text-2xl font-black text-white font-jakarta tracking-tight">JD Match Engine</h2>
                      </div>
                      <p className="text-dust font-medium">Quantify your alignment with specific roles.</p>
                   </div>
                   
                   {result && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-white/10 text-dust hover:bg-white/5"
                        onClick={() => setResult(null)}
                      >
                        Reset Engine
                      </Button>
                   )}
                </div>

                {!result ? (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-widest text-dust/70 flex items-center gap-2">
                                <Search className="h-3 w-3" />
                                Target Job Description
                            </label>
                            <div className="relative group">
                               <div className="absolute inset-0 bg-nebula/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                               <Textarea
                                   placeholder="Paste the full job description here to initiate gap analysis..."
                                   className="min-h-[250px] bg-white/[0.02] border-white/10 rounded-[2rem] p-6 resize-none focus:border-nebula/50 focus:ring-nebula/20 transition-all duration-300 relative z-10 text-starlight placeholder:text-dust/30"
                                   value={jdText}
                                   onChange={(e) => setJdText(e.target.value)}
                               />
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-3 text-nova text-sm bg-nova/5 p-4 rounded-2xl border border-nova/10"
                            >
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </motion.div>
                        )}

                        <MagneticButton
                            onClick={analyzeGap}
                            disabled={loading}
                            className="w-full h-14 font-bold"
                            variant="gradient"
                            size="lg"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Synchronizing Intelligence...
                                </>
                            ) : (
                                <><Zap className="mr-2 h-5 w-5" /> Execute Match Analysis</>
                            )}
                        </MagneticButton>
                    </div>
                ) : (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="space-y-12"
                    >
                        {/* Match Overview */}
                        <div className="flex flex-col items-center py-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative group">
                            <div className="absolute inset-0 bg-aurora/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px]" />
                            <div className="relative z-10 scale-125 md:scale-150 py-8">
                               <ScoreRing score={result.matchScore} size="lg" />
                            </div>
                            <h3 className={cn(
                                "relative z-10 mt-12 text-3xl font-black font-jakarta tracking-tight",
                                result.matchScore >= 80 ? "text-aurora" :
                                    result.matchScore >= 60 ? "text-nebula" : "text-nova"
                            )}>
                                {result.matchScore}% Strategic Alignment
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Positive Matches */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                   <div className="p-2 rounded-xl bg-aurora/10 text-aurora"><CheckCircle2 className="h-5 w-5" /></div>
                                   <h4 className="font-bold text-white text-lg">Semantic Matches</h4>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {result.matchingKeywords.map((kw, i) => (
                                        <Badge key={i} className="bg-aurora/5 text-aurora border-aurora/20 px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase tracking-wider">
                                            {kw}
                                        </Badge>
                                    ))}
                                    {result.matchingKeywords.length === 0 && (
                                        <p className="text-sm text-dust italic">No algorithmic matches found.</p>
                                    )}
                                </div>
                            </div>

                            {/* Gaps to Bridge */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                   <div className="p-2 rounded-xl bg-nova/10 text-nova"><XCircle className="h-5 w-5" /></div>
                                   <h4 className="font-bold text-white text-lg">Critical Gaps</h4>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {result.missingKeywords.map((kw, i) => (
                                        <Badge key={i} className="bg-nova/5 text-nova border-nova/20 px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase tracking-wider">
                                            {kw}
                                        </Badge>
                                    ))}
                                    {result.missingKeywords.length === 0 && (
                                        <p className="text-sm text-aurora font-bold italic">Perfect alignment achieved!</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-[2rem] bg-nebula/5 border border-nebula/10 flex items-center gap-4">
                            <Sparkles className="h-6 w-6 text-nebula shrink-0" />
                            <p className="text-xs text-dust/90 font-medium leading-relaxed">
                                Intelligence Report: Incorporating the missing keywords identified above will increase your visibility to ATS ranking algorithms by an estimated <span className="text-white font-bold">24%</span>.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </GlassCard>
    );
}
