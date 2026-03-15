import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Sparkles, Download, Loader2, AlertCircle, CheckCircle2, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { ResumeData, ATSResult, DetailedScore } from "@/types/resume";
import { toast } from "sonner";

interface ATSScoreProps {
  resumeData: ResumeData;
}

export default function ATSScore({ resumeData }: ATSScoreProps) {
  const [result, setResult] = useState<ATSResult | null>(null);
  const [improvedResume, setImprovedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [applyingFixes, setApplyingFixes] = useState(false);
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
    if (score >= 80) return "text-success bg-success/10 border-success/20";
    if (score >= 60) return "text-accent bg-accent/10 border-accent/20";
    return "text-warning bg-warning/10 border-warning/20";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-accent";
    return "bg-warning";
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="gradient-primary text-primary-foreground pb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">ATS Score Analyzer</CardTitle>
            <CardDescription className="text-primary-foreground/70">
              In-depth 20-parameter performance analysis
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {!result ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">
              Get an expert analysis of your resume formatting, keywords, and content quality.
            </p>
            <Button
              onClick={calculateATS}
              disabled={loading}
              className="gradient-accent text-accent-foreground hover:opacity-90 min-w-[200px]"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-4 w-4" />
                  Run ATS Analysis
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Score Display */}
            <div className="flex flex-col items-center py-4 bg-muted/30 rounded-3xl">
              <ScoreRing score={result.ats_score} size="lg" />
              <p className={cn(
                "mt-4 font-bold text-xl",
                result.ats_score >= 80 ? "text-success" :
                  result.ats_score >= 60 ? "text-accent" : "text-warning"
              )}>
                {result.ats_score >= 80 ? "Elite Score!" :
                  result.ats_score >= 60 ? "Strong Foundation" : "Needs Optimization"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Your score is higher than {result.ats_score - 10}% of applicants.
              </p>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Detailed Analysis</h3>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  20 Parameters Checked
                </span>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-3">
                {result.detailed_breakdown?.map((cat, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-2xl px-4 overflow-hidden bg-card shadow-sm border-muted/20">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span className="font-semibold text-sm">{cat.category}</span>
                        <div className="flex items-center gap-3">
                          <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border", getScoreColor(cat.score))}>
                            {cat.score}%
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1 space-y-4 border-t border-muted/10 mt-1">
                      {cat.subParameters.map((param, pIdx) => (
                        <div key={pIdx} className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium flex items-center gap-1.5">
                              {param.score >= 80 ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                              ) : (
                                <Info className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                              {param.name}
                            </span>
                            <span className="text-muted-foreground">{param.score}%</span>
                          </div>
                          <Progress value={param.score} className="h-1.5" indicatorClassName={getProgressColor(param.score)} />
                          {param.score < 80 && (
                            <p className="text-[10px] text-muted-foreground italic pl-5">
                              💡 {param.feedback}
                            </p>
                          )}
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Suggestions */}
            <div className="grid gap-4">
              <h4 className="font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Strategic Suggestions
              </h4>
              <div className="grid gap-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 text-sm">
                    <div className="p-1 rounded-full bg-orange-500/20 text-orange-600 shrink-0 mt-0.5">
                      <ChevronRight className="h-3 w-3" />
                    </div>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate("/rewrite", {
                  state: {
                    resumeText: resumeData.resume_text,
                    suggestions: result?.suggestions || [],
                  }
                })}
                className="w-full rounded-xl gradient-accent text-accent-foreground transition-all hover:opacity-90"
                size="lg"
                id="rewrite-with-ai-btn"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Rewrite with AI
              </Button>
              <Button
                onClick={calculateATS}
                disabled={loading}
                variant="outline"
                className="w-full rounded-xl"
              >
                <Target className="mr-2 h-4 w-4" />
                Refresh Analysis
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
