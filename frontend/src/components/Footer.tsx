import { Link } from "react-router-dom";
import { Briefcase, Code2, Sparkles, ExternalLink, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container max-w-5xl mx-auto px-4 py-12">
        {/* Product Switcher */}
        <div className="mb-10 p-4 rounded-2xl bg-card border shadow-sm">
          <p className="text-xs text-muted-foreground text-center mb-3 font-medium uppercase tracking-wider">CodeSage Ecosystem</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* HireForge — Active */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-primary text-primary-foreground flex-1 sm:flex-none sm:min-w-[200px]">
              <div className="p-1.5 rounded-lg bg-primary-foreground/20">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold">HireForge</p>
                <p className="text-xs opacity-75">AI Resume Analyzer</p>
              </div>
              <span className="ml-auto text-xs font-medium bg-primary-foreground/20 px-2 py-0.5 rounded-full">Active</span>
            </div>

            {/* CodeSage — Switch to */}
            <a
              href="https://codesage.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border bg-background hover:bg-accent/5 hover:border-accent/30 transition-all flex-1 sm:flex-none sm:min-w-[200px] group"
            >
              <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Code2 className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">CodeSage</p>
                <p className="text-xs text-muted-foreground">AI Code Reviewer</p>
              </div>
              <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          </div>

          {/* Tagline */}
          <p className="text-center text-xs text-muted-foreground mt-4 italic">
            "CodeSage reviews your code. HireForge reviews your career. Together, they make you unstoppable."
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Get Started Free</Link></li>
              <li><Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link></li>
              <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Ecosystem</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://codesage.dev" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
                  CodeSage <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://github.com/codesage" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  GitHub <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <Briefcase className="h-5 w-5 text-primary" />
            <span>HireForge</span>
            <span className="text-muted-foreground font-normal text-sm">· Part of the CodeSage Suite</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">Powered by CodeSage AI</span>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://twitter.com/codesagedev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://github.com/codesage" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          © {currentYear} HireForge by CodeSage. All rights reserved. Free forever — no hidden tiers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
