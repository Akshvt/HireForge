import { useState } from "react";
import { Target, Search, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";
import api from "@/services/api";
import type { ResumeData, JDTargetingResult } from "@/types/resume";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
        <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="gradient-primary text-primary-foreground pb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
                        <Target className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">JD Targeting Tool</CardTitle>
                        <CardDescription className="text-primary-foreground/70">
                            Check how well your resume matches a specific job description
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                {!result ? (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Search className="h-4 w-4" />
                                Paste Job Description
                            </label>
                            <Textarea
                                placeholder="Paste the full job description here..."
                                className="min-h-[200px] bg-muted/30 border-muted-foreground/20 rounded-2xl resize-none focus:ring-accent"
                                value={jdText}
                                onChange={(e) => setJdText(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-xl border border-destructive/20">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <Button
                            onClick={analyzeGap}
                            disabled={loading}
                            className="w-full gradient-accent text-accent-foreground"
                            size="lg"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing Match...
                                </>
                            ) : (
                                "Compare Resume with JD"
                            )}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in">
                        {/* Match Overview */}
                        <div className="flex flex-col items-center py-6 bg-muted/30 rounded-3xl">
                            <ScoreRing score={result.matchScore} size="lg" />
                            <p className={cn(
                                "mt-4 font-bold text-xl",
                                result.matchScore >= 80 ? "text-success" :
                                    result.matchScore >= 60 ? "text-accent" : "text-warning"
                            )}>
                                {result.matchScore}% Match Found
                            </p>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-muted-foreground hover:text-accent"
                                onClick={() => setResult(null)}
                            >
                                Try Another JD
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Positive Matches */}
                            <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2 text-success">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Matching Keywords
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.matchingKeywords.map((kw, i) => (
                                        <Badge key={i} variant="secondary" className="bg-success/10 text-success border-success/20 hover:bg-success/20">
                                            {kw}
                                        </Badge>
                                    ))}
                                    {result.matchingKeywords.length === 0 && (
                                        <p className="text-sm text-muted-foreground italic">No matches found yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Gaps to Bridge */}
                            <div className="space-y-4">
                                <h4 className="font-bold flex items-center gap-2 text-warning">
                                    <XCircle className="h-4 w-4" />
                                    Keywords Missing
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingKeywords.map((kw, i) => (
                                        <Badge key={i} variant="secondary" className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">
                                            {kw}
                                        </Badge>
                                    ))}
                                    {result.missingKeywords.length === 0 && (
                                        <p className="text-sm text-success italic">Perfect keyword match!</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10">
                            <p className="text-xs text-muted-foreground text-center">
                                🚀 Tip: Incorporate the missing keywords into your resume to improve your match score and bypass ATS filters.
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
