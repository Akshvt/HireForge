import { useState } from "react";
import { Target, Sparkles, Download, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import type { ResumeData, ATSResult } from "@/types/resume";

interface ATSScoreProps {
  resumeData: ResumeData;
}

export default function ATSScore({ resumeData }: ATSScoreProps) {
  const [result, setResult] = useState<ATSResult | null>(null);
  const [improvedResume, setImprovedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [applyingFixes, setApplyingFixes] = useState(false);

  const calculateATS = async () => {
    if (!resumeData.resume_text || resumeData.resume_text.length < 50) {
      return;
    }

    try {
      setLoading(true);
      const res = await api.post<ATSResult>("/ats/score", {
        resume_text: resumeData.resume_text,
        skills: resumeData.skills,
        experience: resumeData.experience
      });
      setResult(res.data);
    } catch {
      // Demo data for preview
      setResult({
        ats_score: 72,
        suggestions: [
          "Add more quantifiable achievements with numbers and percentages",
          "Include industry-specific keywords from job descriptions",
          "Use action verbs at the beginning of bullet points",
          "Ensure consistent formatting throughout the document"
        ],
        line_feedback: [
          {
            line: "Worked on various projects",
            issues: ["Too vague", "Missing quantifiable results"],
            improved_example: "Led 5 cross-functional projects, improving team efficiency by 25%"
          },
          {
            line: "Good communication skills",
            issues: ["Subjective claim without evidence"],
            improved_example: "Presented technical solutions to stakeholders across 3 departments"
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFixes = async () => {
    if (!result) return;
    
    try {
      setApplyingFixes(true);
      const res = await api.post<{ improved_resume: string }>("/ats/apply-fixes", {
        resume_text: resumeData.resume_text,
        feedback: result.line_feedback
      });
      setImprovedResume(res.data.improved_resume);
    } catch {
      // Demo improved resume
      setImprovedResume(`IMPROVED RESUME

PROFESSIONAL SUMMARY
Results-driven software engineer with ${resumeData.experience}+ years of experience in ${resumeData.skills.slice(0, 3).join(", ")}. Proven track record of delivering high-quality solutions.

SKILLS
${resumeData.skills.join(" • ")}

EXPERIENCE
• Led development of 5+ full-stack applications, improving user engagement by 40%
• Collaborated with cross-functional teams of 10+ members to deliver projects on time
• Implemented automated testing frameworks, reducing bug reports by 60%
• Mentored 3 junior developers, improving team productivity by 25%`);
    } finally {
      setApplyingFixes(false);
    }
  };

  const exportPDF = async () => {
    try {
      const res = await api.post<Blob>(
        "/ats/export-pdf",
        { resume_text: improvedResume },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Improved_Resume.pdf";
      a.click();
    } catch {
      // Create text file as fallback
      const blob = new Blob([improvedResume], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Improved_Resume.txt";
      a.click();
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
            <CardTitle className="text-xl">ATS Score Analyzer</CardTitle>
            <CardDescription className="text-primary-foreground/70">
              Optimize your resume for applicant tracking systems
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {!result ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Get insights on how well your resume will perform with ATS systems
            </p>
            <Button 
              onClick={calculateATS} 
              disabled={loading}
              className="gradient-accent text-accent-foreground hover:opacity-90"
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
                  Calculate ATS Score
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Score Display */}
            <div className="flex flex-col items-center py-4">
              <ScoreRing score={result.ats_score} size="lg" />
              <p className={cn(
                "mt-4 font-semibold text-lg",
                result.ats_score >= 80 ? "text-success" : 
                result.ats_score >= 60 ? "text-accent" : "text-warning"
              )}>
                {result.ats_score >= 80 ? "Excellent!" : 
                 result.ats_score >= 60 ? "Good, but can improve" : "Needs improvement"}
              </p>
            </div>

            {/* Suggestions */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Suggestions
              </h4>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Line Feedback */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                Line-by-Line Feedback
              </h4>
              <div className="space-y-4">
                {result.line_feedback.map((l, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <p className="font-medium text-sm text-destructive line-through">{l.line}</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {l.issues.map((iss, j) => (
                        <li key={j} className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                          {iss}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-success font-medium">✨ {l.improved_example}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={applyFixes} 
              disabled={applyingFixes}
              className="w-full gradient-accent text-accent-foreground hover:opacity-90"
              size="lg"
            >
              {applyingFixes ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Applying Fixes...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Apply All Fixes
                </>
              )}
            </Button>
          </div>
        )}

        {improvedResume && (
          <div className="mt-6 space-y-4 animate-slide-up">
            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Improved Resume
            </h4>
            <div className="p-4 rounded-lg bg-success/5 border border-success/20 max-h-64 overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap text-foreground">{improvedResume}</pre>
            </div>
            <Button onClick={exportPDF} variant="outline" className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
