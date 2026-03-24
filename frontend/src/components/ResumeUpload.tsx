import { useState, useCallback } from "react";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import type { ResumeData } from "@/types/resume";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

interface ResumeUploadProps {
  onParsed: (data: ResumeData) => void;
  resumeData: ResumeData | null;
}

export default function ResumeUpload({ onParsed, resumeData }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidFile = (file: File) => {
    return [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.type);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile || !isValidFile(droppedFile)) {
      const msg = "Please upload a valid PDF, DOC, or DOCX file.";
      setError(msg);
      toast.error(msg);
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

  const uploadResume = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.post<{ parsedText: string; skills: string[] }>("/api/resumes/upload", formData);

      const parsedText = res.data.parsedText;
      const skills = res.data.skills || [];

      if (!parsedText || typeof parsedText !== "string" || parsedText.trim().length < 50) {
        throw new Error("Invalid resume content");
      }

      setError(null);
      toast.success("Resume uploaded and analyzed!");
      onParsed({
        resume_text: parsedText,
        skills: skills,
        experience: 0,
      });
    } catch (err: unknown) {
      console.error("Resume upload error:", err);
      const errorMessage = (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
        "Failed to parse resume. Please upload a valid resume.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isUploaded = Boolean(resumeData?.resume_text);

  return (
    <motion.div
      className="overflow-hidden rounded-3xl glass-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(16, 185, 129, 0.06)",
      }}
    >
      {/* Header — Nebula gradient */}
      <div className="bg-gradient-to-r from-nebula to-cyan p-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-sm">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-jakarta text-white">Upload Resume</h3>
            <p className="text-white/60 text-sm">
              PDF, DOC, or DOCX formats accepted
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-4 rounded-xl bg-nova/10 border border-nova/20 p-3 text-sm text-nova"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative rounded-2xl p-10 text-center transition-all duration-300",
            "border-2 border-dashed",
            isDragging
              ? "border-nebula bg-nebula/5 scale-[1.03] shadow-[0_0_40px_rgba(var(--foreground),0.1)]"
              : "border-border hover:border-nebula/30 hover:bg-black/5 dark:hover:bg-white/5",
            isUploaded && "border-aurora/30 bg-aurora/5"
          )}
          style={{
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <AnimatePresence mode="wait">
            {isUploaded ? (
              <motion.div
                key="uploaded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="p-3 rounded-full bg-aurora/15 animate-pulse-ring">
                  <CheckCircle2 className="h-8 w-8 text-aurora" />
                </div>
                <div>
                  <p className="font-semibold font-jakarta text-starlight">Resume Uploaded!</p>
                  <p className="text-sm text-dust mt-1">
                    {resumeData?.skills.length ?? 0} skills detected •{" "}
                    {resumeData?.experience ?? 0} years experience
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                    setError(null);
                  }}
                />

                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full animate-pulse-ring" />
                    <div
                      className={cn(
                        "p-5 rounded-full transition-all duration-300",
                        isDragging
                          ? "bg-gradient-to-br from-nebula to-cyan shadow-[0_0_50px_rgba(var(--foreground),0.1)]"
                          : "bg-black/5 dark:bg-white/5"
                      )}
                    >
                      <Upload
                        className={cn(
                          "h-8 w-8 animate-icon-float transition-colors duration-300",
                          isDragging ? "text-white" : "text-dust"
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium font-jakarta text-starlight">
                      {file ? file.name : "Drop your resume here"}
                    </p>
                    <p className="text-sm text-dust mt-1">
                      or click to browse files
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Upload Button */}
        <AnimatePresence>
          {file && !isUploaded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-5"
            >
              <MagneticButton
                onClick={uploadResume}
                disabled={loading}
                variant="gradient"
                size="lg"
                className="w-full"
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
              </MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
