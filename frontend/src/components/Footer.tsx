import { Link } from "react-router-dom";
import { Briefcase, Code2, Sparkles, ExternalLink, Github, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-nebula/30 to-transparent" />
      
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 animate-fade-in">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-nebula to-cyan shadow-lg shadow-nebula/20 transition-transform group-hover:scale-105">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-jakarta font-bold text-starlight text-xl tracking-tight">HireForge</span>
            </Link>
            <p className="text-dust text-sm leading-relaxed max-w-xs transition-colors hover:text-starlight/80">
              The premium, open-source AI resume ecosystem. Built for developers who want to master their career path.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {[
                { Icon: Twitter, href: "https://twitter.com/codesagedev" },
                { Icon: Github, href: "https://github.com/codesage" },
                { Icon: Mail, href: "/contact" }
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  to={href.startsWith("http") ? "#" : href}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-nebula transition-all border border-white/5"
                  onClick={() => href.startsWith("http") && window.open(href, "_blank")}
                >
                  <Icon className="h-4.5 w-4.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Product",
                links: [
                  { to: "/how-it-works", label: "How It Works" },
                  { to: "/faq", label: "FAQ" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { to: "/register", label: "Get Started" },
                  { to: "/dashboard", label: "Dashboard" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms of Service" },
                  { to: "/contact", label: "Contact Us" },
                ],
              },
            ].map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-starlight/50">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-dust hover:text-nebula transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-dust">
            <span>© {currentYear} HireForge</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
          </div>
          
          <div className="flex items-center gap-6">
             <Link to="/privacy" className="text-xs text-dust hover:text-starlight transition-colors">Privacy</Link>
             <Link to="/terms" className="text-xs text-dust hover:text-starlight transition-colors">Terms</Link>
             <span className="text-xs text-muted">v2.0.4-premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
