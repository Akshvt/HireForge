import { useState, useCallback } from "react";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import type { ResumeData } from "@/types/resume";

interface ResumeUploadProps {
  onParsed: (data: ResumeData) => void;
  resumeData: ResumeData | null;
}

export default function ResumeUpload({
  onParsed,
  resumeData,
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- FILE VALIDATION ---------------- */
  const isValidFile = (file: File) => {
    return [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.type);
  };

  /* ---------------- DRAG & DROP ---------------- */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile || !isValidFile(droppedFile)) {
      setError("Please upload a valid PDF, DOC, or DOCX file.");
      return;
    }

    setFile(droppedFile);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* ---------------- UPLOAD ---------------- */
  const uploadResume = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post<any>("/resume/upload", formData);

      /**
       * 🔥 FUTURE-PROOF NORMALIZATION
       * Supports:
       * - { parsed_resume: {...} }
       * - { parsedResume: {...} }
       * - { resume_text, skills, experience }
       */
      const parsed: ResumeData | undefined =
        res.data?.parsed_resume ||
        res.data?.parsedResume ||
        (res.data?.resume_text ? res.data : undefined);

      if (
        !parsed ||
        typeof parsed.resume_text !== "string" ||
        parsed.resume_text.trim().length < 50
      ) {
        throw new Error("Invalid resume content");
      }

      // ✅ SUCCESS
      setError(null);
      onParsed({
        resume_text: parsed.resume_text,
        skills: parsed.skills ?? [],
        experience: parsed.experience ?? 0,
      });
    } catch (err: any) {
      console.error("Resume upload error:", err);
      setError(
        err?.response?.data?.detail ||
          "Failed to parse resume. Please upload a valid resume."
      );
    } finally {
      setLoading(false);
    }
  };

  const isUploaded = Boolean(resumeData?.resume_text);

  /* ---------------- UI ---------------- */
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="gradient-primary text-primary-foreground pb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-foreground/10">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Upload Resume</CardTitle>
            <CardDescription className="text-primary-foreground/70">
              PDF, DOC, or DOCX formats accepted
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {error && (
          <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 text-center transition-all",
            isDragging
              ? "border-accent bg-accent/5 scale-[1.02]"
              : "border-muted-foreground/25 hover:border-accent/50",
            isUploaded && "border-success bg-success/5"
          )}
        >
          {isUploaded ? (
            <div className="flex flex-col items-center gap-3 animate-fade-in">
              <div className="p-3 rounded-full bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <div>
                <p className="font-semibold">Resume Uploaded!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {resumeData?.skills.length ?? 0} skills detected •{" "}
                  {resumeData?.experience ?? 0} years experience
                </p>
              </div>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setError(null);
                }}
              />

              <div className="flex flex-col items-center gap-3">
                <div className="p-4 rounded-full bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">
                    {file ? file.name : "Drop your resume here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {file && !isUploaded && (
          <Button
            onClick={uploadResume}
            disabled={loading}
            className="w-full mt-4 gradient-accent text-accent-foreground"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload & Analyze
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
