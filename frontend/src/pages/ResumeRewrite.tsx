import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sparkles, Download, Loader2, FileText, FileType, File,
  ArrowLeft, RefreshCw, Eye, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import api from "@/services/api";

type Tone = "professional" | "technical" | "creative" | "executive";

const TONE_DESCRIPTIONS: Record<Tone, { label: string; desc: string; emoji: string }> = {
  professional: { label: "Professional", desc: "Polished, corporate, recruiter-ready", emoji: "💼" },
  technical: { label: "Technical", desc: "Engineering depth, system design focus", emoji: "⚙️" },
  creative: { label: "Creative", desc: "Engaging narrative, memorable story", emoji: "🎨" },
  executive: { label: "Executive", desc: "Strategic leadership, board-level impact", emoji: "👔" },
};

export default function ResumeRewrite() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    resumeText?: string;
    suggestions?: string[];
  } | null;

  const [tone, setTone] = useState<Tone>("professional");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [rewrittenText, setRewrittenText] = useState<string>("");
  const [viewMode, setViewMode] = useState<"split" | "rewritten">("split");

  const originalText = state?.resumeText || "";
  const suggestions = state?.suggestions || [];

  useEffect(() => {
    if (!originalText) {
      toast.error("No resume data found. Please upload and analyze first.");
      navigate("/dashboard");
    }
  }, [originalText, navigate]);

  const handleRewrite = async () => {
    try {
      setLoading(true);
      const res = await api.post<{ rewrittenText: string }>("/api/ai/rewrite", {
        resumeText: originalText,
        tone,
        suggestions,
      });
      setRewrittenText(res.data.rewrittenText);
      toast.success("Resume rewritten successfully!");
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ||
        "Failed to rewrite resume. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format: "pdf" | "docx" | "md") => {
    if (!rewrittenText) {
      toast.error("Generate a rewrite first.");
      return;
    }
    try {
      setDownloading(format);
      const res = await api.post<Blob>("/api/ai/download", { text: rewrittenText, format }, {
        responseType: "blob",
      });

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const extensions: Record<string, string> = { pdf: "pdf", docx: "docx", md: "md" };
      link.download = `HireForge_Resume.${extensions[format]}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success(`Downloaded as ${format.toUpperCase()}`);
    } catch {
      toast.error(`Failed to download ${format.toUpperCase()}.`);
    } finally {
      setDownloading(null);
    }
  };

  const formatResumeForDisplay = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-3" />;

      // Section headers
      if (/^#{1,3}\s/.test(trimmed) || /^[A-Z][A-Z\s&/]{2,}$/.test(trimmed)) {
        const headerText = trimmed.replace(/^#+\s*/, "");
        return (
          <h3 key={i} className="font-bold text-base text-primary mt-4 mb-1 tracking-wide uppercase">
            {headerText}
          </h3>
        );
      }

      // Bullets
      if (/^[-*•]\s/.test(trimmed)) {
        return (
          <div key={i} className="flex gap-2 py-0.5 pl-2">
            <span className="text-primary/60 shrink-0">•</span>
            <span className="text-sm leading-relaxed">{trimmed.replace(/^[-*•]\s*/, "")}</span>
          </div>
        );
      }

      // Bold text
      if (/^\*\*(.+)\*\*/.test(trimmed)) {
        const content = trimmed.replace(/\*\*/g, "");
        return (
          <p key={i} className="font-semibold text-sm mt-2">
            {content}
          </p>
        );
      }

      return (
        <p key={i} className="text-sm leading-relaxed text-muted-foreground">
          {trimmed}
        </p>
      );
    });
  };

  if (!originalText) return null;

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Resume Rewriter
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Powered by Google Gemini — transform your resume with AI
            </p>
          </div>
        </div>

        {/* Controls Card */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="gradient-primary text-primary-foreground pb-6">
            <CardTitle className="text-lg">Rewrite Configuration</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="flex-1 w-full sm:w-auto space-y-2">
                <label className="text-sm font-medium">Select Tone</label>
                <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                  <SelectTrigger className="w-full sm:w-[280px]" id="tone-selector">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(TONE_DESCRIPTIONS) as [Tone, typeof TONE_DESCRIPTIONS[Tone]][]).map(
                      ([key, { label, desc, emoji }]) => (
                        <SelectItem key={key} value={key}>
                          <span className="flex items-center gap-2">
                            <span>{emoji}</span>
                            <span className="font-medium">{label}</span>
                            <span className="text-xs text-muted-foreground hidden sm:inline">— {desc}</span>
                          </span>
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleRewrite}
                disabled={loading}
                className="gradient-accent hover:opacity-90 text-accent-foreground min-w-[180px] transition-all"
                size="lg"
                id="generate-rewrite-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Rewriting...
                  </>
                ) : rewrittenText ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Rewrite
                  </>
                )}
              </Button>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  ATS feedback being addressed:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.slice(0, 4).map((s, i) => (
                    <Badge key={i} variant="secondary" className="text-xs font-normal">
                      {s.length > 50 ? s.slice(0, 50) + "…" : s}
                    </Badge>
                  ))}
                  {suggestions.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{suggestions.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading skeleton */}
        {loading && (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-16 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-lg font-medium">AI is rewriting your resume...</p>
              <p className="text-sm text-muted-foreground mt-2">
                This may take 10–20 seconds depending on resume length
              </p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {rewrittenText && !loading && (
          <div className="space-y-4 animate-fade-in">
            {/* View Toggle + Downloads */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "split" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("split")}
                >
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  Split View
                </Button>
                <Button
                  variant={viewMode === "rewritten" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("rewritten")}
                >
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  Rewritten Only
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground mr-1">Download:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload("pdf")}
                  disabled={!!downloading}
                  id="download-pdf-btn"
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                >
                  {downloading === "pdf" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <File className="mr-1.5 h-3.5 w-3.5 text-red-500" />
                  )}
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload("docx")}
                  disabled={!!downloading}
                  id="download-docx-btn"
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                >
                  {downloading === "docx" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <FileType className="mr-1.5 h-3.5 w-3.5 text-blue-500" />
                  )}
                  Word
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload("md")}
                  disabled={!!downloading}
                  id="download-md-btn"
                  className="hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all"
                >
                  {downloading === "md" ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <FileText className="mr-1.5 h-3.5 w-3.5 text-green-500" />
                  )}
                  Markdown
                </Button>
              </div>
            </div>

            {/* Content Display */}
            {viewMode === "split" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Original */}
                <Card className="border shadow-sm overflow-hidden">
                  <CardHeader className="py-3 px-4 bg-muted/40 border-b">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-600 border-orange-200">
                        Original
                      </Badge>
                      Your uploaded resume
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 max-h-[600px] overflow-y-auto">
                    <div className="prose-sm">{formatResumeForDisplay(originalText)}</div>
                  </CardContent>
                </Card>

                {/* Rewritten */}
                <Card className="border shadow-sm overflow-hidden ring-2 ring-primary/20">
                  <CardHeader className="py-3 px-4 bg-primary/5 border-b border-primary/10">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Badge className="text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                        <Sparkles className="mr-1 h-3 w-3" />
                        AI Rewritten
                      </Badge>
                      Optimized for ATS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 max-h-[600px] overflow-y-auto">
                    <div className="prose-sm">{formatResumeForDisplay(rewrittenText)}</div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border shadow-sm overflow-hidden ring-2 ring-primary/20">
                <CardHeader className="py-3 px-4 bg-primary/5 border-b border-primary/10">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Badge className="text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                      <Sparkles className="mr-1 h-3 w-3" />
                      AI Rewritten Resume
                    </Badge>
                    <span className="text-muted-foreground">
                      ({TONE_DESCRIPTIONS[tone].emoji} {TONE_DESCRIPTIONS[tone].label} tone)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 max-h-[700px] overflow-y-auto">
                  <div className="prose-sm max-w-none">{formatResumeForDisplay(rewrittenText)}</div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Empty state when no rewrite yet */}
        {!rewrittenText && !loading && (
          <Card className="border-dashed border-2 border-muted-foreground/20">
            <CardContent className="py-16 text-center">
              <Sparkles className="h-12 w-12 text-primary/30 mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Select a tone and click "Generate Rewrite"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Your resume will be rewritten using AI with ATS-optimized formatting
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
