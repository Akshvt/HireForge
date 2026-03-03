import { useState } from "react";
import { Briefcase, ExternalLink, Loader2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import type { ResumeData, Job } from "@/types/resume";

interface JobRecommendationsProps {
  resumeData: ResumeData;
}

/* ✅ Removed EXPERIENCED */
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

      const res = await api.post<{ recommended_jobs: Job[] }>(
        "/jobs/recommend",
        {
          resume_text: resumeData.resume_text,
          skills: resumeData.skills,
          experience: resumeData.experience
        }
      );

      setJobs(res.data.recommended_jobs || []);
      setHasSearched(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to fetch job recommendations. Try again."
      );
      setJobs([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER ---------------- */
  const filteredJobs =
    filter === "ALL" ? jobs : jobs.filter(job => job.job_type === filter);

  const filters: { label: string; value: JobFilter }[] = [
    { label: "All", value: "ALL" },
    { label: "Internships", value: "INTERNSHIP" },
    { label: "Freshers", value: "FRESHER" }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-success text-success-foreground";
    if (score >= 70) return "bg-accent text-accent-foreground";
    return "bg-warning text-warning-foreground";
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="gradient-primary text-primary-foreground pb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-foreground/10">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Job Recommendations</CardTitle>
            <CardDescription className="text-primary-foreground/70">
              Find jobs that match your skills and experience
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

        {!hasSearched ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Discover job opportunities tailored to your profile
            </p>
            <Button
              onClick={fetchJobs}
              disabled={loading}
              className="gradient-accent text-accent-foreground"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Jobs...
                </>
              ) : (
                <>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Find Matching Jobs
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* FILTERS */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {filters.map(f => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    filter === f.value &&
                      "gradient-accent text-accent-foreground"
                  )}
                >
                  {f.label}
                </Button>
              ))}
            </div>

            {/* JOB GRID */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No jobs found for this filter.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredJobs.map((job, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border bg-card hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{job.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {job.job_type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {job.experience_level}
                          </span>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-bold",
                          getScoreColor(job.final_score)
                        )}
                      >
                        {Math.round(job.final_score)}%
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.skills.slice(0, 4).map((skill, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.skills.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href={job.linkedin_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-accent hover:underline"
                      >
                        LinkedIn <ExternalLink className="h-3 w-3" />
                      </a>
                      <a
                        href={job.naukri_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-accent hover:underline"
                      >
                        Naukri <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
