import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, ChevronRight, RefreshCw, Sparkles, Target, FileText, BookOpen } from "lucide-react";

const careerTips = [
  {
    category: "ATS Tip",
    categoryColor: "text-blue-500",
    categoryBg: "bg-blue-500/10",
    icon: Target,
    title: "Quantify Every Achievement",
    tip: "Resumes with numbers get 40% more callbacks. Replace 'improved performance' with 'reduced API latency by 60%, from 800ms to 320ms'.",
  },
  {
    category: "Keyword Strategy",
    categoryColor: "text-purple-500",
    categoryBg: "bg-purple-500/10",
    icon: Sparkles,
    title: "Mirror the Job Description",
    tip: "Copy exact terms from the JD into your resume (e.g., if the JD says 'cross-functional collaboration', use that exact phrase — not 'worked across teams').",
  },
  {
    category: "Formatting",
    categoryColor: "text-green-500",
    categoryBg: "bg-green-500/10",
    icon: FileText,
    title: "Avoid Tables and Text Boxes",
    tip: "Most ATS parsers skip content in tables, text boxes, and headers/footers. Use plain sections with standard headings only.",
  },
  {
    category: "Career Growth",
    categoryColor: "text-orange-500",
    categoryBg: "bg-orange-500/10",
    icon: TrendingUp,
    title: "Update Your Resume Every 3 Months",
    tip: "Don't wait until you're job hunting to update your resume. Add achievements while they're fresh — you'll forget the numbers later.",
  },
  {
    category: "Job Search",
    categoryColor: "text-accent",
    categoryBg: "bg-accent/10",
    icon: BookOpen,
    title: "Apply Within 48 Hours of Posting",
    tip: "Applications submitted within 48 hours of a job posting have a 3× higher interview rate. Set up job alerts and move fast.",
  },
  {
    category: "ATS Tip",
    categoryColor: "text-blue-500",
    categoryBg: "bg-blue-500/10",
    icon: Target,
    title: "Use Standard Section Headers",
    tip: "ATS systems look for exact keywords like 'Work Experience', 'Education', 'Skills'. Creative headers like 'My Journey' confuse parsers.",
  },
];

const didYouKnows = [
  "75% of resumes are never seen by a human — ATS filters them first.",
  "The average recruiter spends only 7.4 seconds on an initial resume scan.",
  "Resumes with LinkedIn profiles get 71% more responses.",
  "Action verbs like 'Architected', 'Scaled', and 'Drove' score higher than 'Worked on'.",
  "A resume longer than 2 pages reduces callback rates by 17% for roles under 10 years experience.",
  "Adding a Skills section increases ATS match rate by up to 30% for technical roles.",
];

const CareerTipsFeed = () => {
  const navigate = useNavigate();
  const [tipIndex, setTipIndex] = useState(0);
  const [knowIndex, setKnowIndex] = useState(0);

  const tip = careerTips[tipIndex % careerTips.length];
  const TipIcon = tip.icon;

  return (
    <div className="space-y-4">
      {/* Career Tip Card */}
      <div className="p-5 rounded-2xl bg-card border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" /> Career Tip
          </h3>
          <button
            onClick={() => setTipIndex(i => i + 1)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            title="Next tip"
          >
            <RefreshCw className="h-3 w-3" /> Next
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${tip.categoryBg} shrink-0`}>
              <TipIcon className={`h-4 w-4 ${tip.categoryColor}`} />
            </div>
            <div className="space-y-1">
              <span className={`text-xs font-semibold uppercase tracking-wider ${tip.categoryColor}`}>{tip.category}</span>
              <p className="font-semibold text-sm">{tip.title}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{tip.tip}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-xs"
          onClick={() => navigate("/how-it-works")}
        >
          Learn more about resume optimization <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      {/* Did You Know Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" /> Did You Know?
          </h3>
          <button
            onClick={() => setKnowIndex(i => i + 1)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          "{didYouKnows[knowIndex % didYouKnows.length]}"
        </p>
        <div className="flex gap-1 mt-2">
          {didYouKnows.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-colors ${i === knowIndex % didYouKnows.length ? "bg-accent" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>

      {/* FAQ shortcut */}
      <button
        onClick={() => navigate("/faq")}
        className="w-full p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-colors text-left space-y-1"
      >
        <p className="text-sm font-medium">Have questions about ATS?</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Browse our 25+ FAQ answers <ChevronRight className="h-3 w-3" />
        </p>
      </button>
    </div>
  );
};

export default CareerTipsFeed;
