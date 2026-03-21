import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, ChevronRight, RefreshCw, Sparkles, Target, FileText, BookOpen } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";

const careerTips = [
  {
    category: "ATS Tip",
    categoryColor: "text-nebula",
    categoryBg: "bg-nebula/15",
    icon: Target,
    title: "Quantify Every Achievement",
    tip: "Resumes with numbers get 40% more callbacks. Replace 'improved performance' with 'reduced API latency by 60%, from 800ms to 320ms'.",
  },
  {
    category: "Keyword Strategy",
    categoryColor: "text-nebula",
    categoryBg: "bg-nebula/15",
    icon: Sparkles,
    title: "Mirror the Job Description",
    tip: "Copy exact terms from the JD into your resume (e.g., if the JD says 'cross-functional collaboration', use that exact phrase — not 'worked across teams').",
  },
  {
    category: "Formatting",
    categoryColor: "text-aurora",
    categoryBg: "bg-aurora/15",
    icon: FileText,
    title: "Avoid Tables and Text Boxes",
    tip: "Most ATS parsers skip content in tables, text boxes, and headers/footers. Use plain sections with standard headings only.",
  },
  {
    category: "Career Growth",
    categoryColor: "text-cyan",
    categoryBg: "bg-cyan/15",
    icon: TrendingUp,
    title: "Update Your Resume Every 3 Months",
    tip: "Don't wait until you're job hunting to update your resume. Add achievements while they're fresh — you'll forget the numbers later.",
  },
  {
    category: "Job Search",
    categoryColor: "text-aurora",
    categoryBg: "bg-aurora/15",
    icon: BookOpen,
    title: "Apply Within 48 Hours of Posting",
    tip: "Applications submitted within 48 hours of a job posting have a 3× higher interview rate. Set up job alerts and move fast.",
  },
  {
    category: "ATS Tip",
    categoryColor: "text-nebula",
    categoryBg: "bg-nebula/15",
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

/* ── Typewriter text ── */
function TypewriterText({ text, animKey }: { text: string; animKey: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text, animKey]);

  return (
    <span className={isComplete ? "" : "border-r-2 border-nebula/50"}>
      {displayedText}
    </span>
  );
}

const CareerTipsFeed = () => {
  const navigate = useNavigate();
  const [tipIndex, setTipIndex] = useState(0);
  const [knowIndex, setKnowIndex] = useState(0);

  const tip = careerTips[tipIndex % careerTips.length];
  const TipIcon = tip.icon;

  return (
    <div className="space-y-4">
      {/* Career Tip Card */}
      <GlassCard
        index={5}
        levitate={true}
        tilt={false}
        shimmer={true}
        glowColor="nebula"
      >
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-dust uppercase tracking-wider flex items-center gap-2 font-mono-jb">
              <Lightbulb className="h-4 w-4 text-amber-400" /> Career Tip
            </h3>
            <button
              onClick={() => setTipIndex((i) => i + 1)}
              className="text-xs text-dust hover:text-nebula transition-colors flex items-center gap-1"
              title="Next tip"
            >
              <RefreshCw className="h-3 w-3" /> Next
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tipIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${tip.categoryBg} shrink-0`}>
                  <TipIcon className={`h-4 w-4 ${tip.categoryColor}`} />
                </div>
                <div className="space-y-1">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${tip.categoryColor}`}
                  >
                    {tip.category}
                  </span>
                  <p className="font-semibold text-sm font-jakarta text-starlight">{tip.title}</p>
                </div>
              </div>
              <p className="text-sm text-dust leading-relaxed">
                <TypewriterText text={tip.tip} animKey={String(tipIndex)} />
              </p>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between text-xs text-dust hover:text-nebula hover:bg-white/5"
            onClick={() => navigate("/how-it-works")}
          >
            Learn more about resume optimization{" "}
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </GlassCard>

      {/* Did You Know Card */}
      <GlassCard
        index={6}
        levitate={true}
        tilt={false}
        glowColor="aurora"
      >
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-dust uppercase tracking-wider flex items-center gap-2 font-mono-jb">
              <Sparkles className="h-4 w-4 text-aurora" /> Did You Know?
            </h3>
            <button
              onClick={() => setKnowIndex((i) => i + 1)}
              className="text-xs text-dust hover:text-aurora transition-colors flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={knowIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-sm text-dust leading-relaxed italic"
            >
              "{didYouKnows[knowIndex % didYouKnows.length]}"
            </motion.p>
          </AnimatePresence>
          <div className="flex gap-1 mt-2">
            {didYouKnows.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                  i === knowIndex % didYouKnows.length
                    ? "bg-gradient-to-r from-nebula to-cyan"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* FAQ shortcut */}
      <GlassCard index={7} levitate={false} tilt={true} glowColor="nebula">
        <button
          onClick={() => navigate("/faq")}
          className="w-full p-4 text-left space-y-1"
        >
          <p className="text-sm font-medium font-jakarta text-starlight">Have questions about ATS?</p>
          <p className="text-xs text-dust flex items-center gap-1">
            Browse our 25+ FAQ answers <ChevronRight className="h-3 w-3" />
          </p>
        </button>
      </GlassCard>
    </div>
  );
};

export default CareerTipsFeed;
