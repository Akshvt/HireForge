import { useState } from "react";
import {
  TrendingUp,
  ExternalLink,
  Loader2,
  BookOpen,
  Check,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";
import api from "@/services/api";

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

      const res = await api.post<CareerAPIResponse>("/career/recommend", {
        skills: resumeData.skills
      });

      setData(res.data);
      setView("PRIMARY");
      setProgress({});
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to generate career path. Please try again."
      );
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

    const resources = [
      { key: "youtube", label: "YouTube", color: "text-red-500" },
      { key: "coursera", label: "Coursera", color: "text-blue-500" },
      { key: "udemy", label: "Udemy", color: "text-purple-500" },
      { key: "gfg", label: "GFG", color: "text-green-500" },
      { key: "w3schools", label: "W3", color: "text-indigo-500" }
    ] as const;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="px-4 py-2 rounded-lg bg-muted text-center">
            <p className="text-xs text-muted-foreground">Current</p>
            <p className="font-semibold">{path.current_role}</p>
          </div>
          <ChevronRight className="h-6 w-6 text-accent" />
          <div className="px-4 py-2 rounded-lg gradient-accent text-accent-foreground text-center">
            <p className="text-xs opacity-80">Next</p>
            <p className="font-semibold">{path.next_role}</p>
          </div>
        </div>

        <ProgressBar value={completed} max={total || 1} />

        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-accent" />
            Skills to Learn ({total - completed} remaining)
          </h4>

          {total === 0 ? (
            <div className="p-4 rounded-lg bg-success/10 border text-center">
              <Check className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="font-semibold text-success">
                You already match this role 🎉
              </p>
            </div>
          ) : (
            path.missing_skills.map(skill => (
              <div
                key={skill}
                className={cn(
                  "p-4 rounded-lg border",
                  progress[skill]
                    ? "bg-success/5 border-success/20"
                    : "bg-card hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={!!progress[skill]}
                    onCheckedChange={() => toggleSkill(skill)}
                  />
                  <span
                    className={cn(
                      "font-medium",
                      progress[skill] && "line-through text-muted-foreground"
                    )}
                  >
                    {skill}
                  </span>
                </div>

                {!progress[skill] && path.learning_resources?.[skill] && (
                  <div className="mt-3 flex flex-wrap gap-2 pl-7">
                    {resources.map(r =>
                      path.learning_resources[skill]?.[r.key] ? (
                        <a
                          key={r.key}
                          href={path.learning_resources[skill][r.key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted",
                            r.color
                          )}
                        >
                          {r.label}
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  /* ---------- UI ---------- */
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="gradient-primary text-primary-foreground pb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-foreground/10">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Career Path</CardTitle>
            <CardDescription className="text-primary-foreground/70">
              Your personalized roadmap to career growth
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {error && (
          <div className="mb-4 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        {!data ? (
          <div className="text-center py-8">
            <Button
              onClick={fetchCareer}
              disabled={loading}
              className="gradient-accent text-accent-foreground"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Get Career Path
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-6">
              <Button
                size="sm"
                onClick={() => setView("PRIMARY")}
                className={cn(view === "PRIMARY" && "gradient-accent")}
              >
                Best Path
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setView("TECH")}
              >
                Tech Paths
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setView("NONTECH")}
              >
                Non-Tech Paths
              </Button>
            </div>

            {view === "PRIMARY" && renderPath(data.primary_path)}
            {view === "TECH" &&
              data.tech_paths.map((p, i) => (
                <div key={i}>{renderPath(p)}</div>
              ))}
            {view === "NONTECH" &&
              data.non_tech_paths.map((p, i) => (
                <div key={i}>{renderPath(p)}</div>
              ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}
