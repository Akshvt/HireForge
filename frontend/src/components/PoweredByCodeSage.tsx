import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

interface PoweredByCodeSageProps {
  variant?: "inline" | "badge" | "footer";
  className?: string;
}

const PoweredByCodeSage = ({ variant = "badge", className = "" }: PoweredByCodeSageProps) => {
  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1 text-xs text-muted-foreground ${className}`}>
        <Sparkles className="h-3 w-3 text-accent" />
        Powered by{" "}
        <a
          href="https://codesage.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent hover:underline"
        >
          CodeSage
        </a>
      </span>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-accent">Powered by CodeSage</span>
        </div>
      </div>
    );
  }

  // badge (default)
  return (
    <a
      href="https://codesage.dev"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors ${className}`}
    >
      <Sparkles className="h-3.5 w-3.5 text-accent" />
      <span className="text-xs font-semibold text-accent">Powered by CodeSage AI</span>
    </a>
  );
};

export default PoweredByCodeSage;
