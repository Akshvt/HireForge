import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ScoreRing({ score, maxScore = 100, size = "md", className }: ScoreRingProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const sizes = {
    sm: { container: "w-20 h-20", text: "text-lg", subtext: "text-xs" },
    md: { container: "w-32 h-32", text: "text-3xl", subtext: "text-sm" },
    lg: { container: "w-44 h-44", text: "text-5xl", subtext: "text-base" },
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "stroke-success";
    if (percentage >= 60) return "stroke-accent";
    if (percentage >= 40) return "stroke-warning";
    return "stroke-destructive";
  };

  return (
    <div className={cn("relative animate-score-pop", sizes[size].container, className)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          className="stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-out", getScoreColor())}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold text-foreground", sizes[size].text)}>
          {Math.round(score)}
        </span>
        <span className={cn("text-muted-foreground", sizes[size].subtext)}>
          / {maxScore}
        </span>
      </div>
    </div>
  );
}
