import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Database, Trash2, Mail } from "lucide-react";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const lastUpdated = "March 14, 2026";

  const sections = [
    {
      id: "what-we-collect",
      icon: Database,
      title: "1. What We Collect",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      content: (
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Account Information:</strong> When you register, we collect your name, email address, and password (stored as a bcrypt hash — we never store your plaintext password).</p>
          <p><strong className="text-foreground">Resume Data:</strong> When you upload a resume, we store the parsed text and extracted structured data (skills, experience, education). We store your resume text to power Resume History and enable you to re-analyze without re-uploading.</p>
          <p><strong className="text-foreground">Usage Data:</strong> We collect standard usage analytics including pages visited, features used, resume upload count, and ATS score history. This is used to improve HireForge and is never linked to identifiable personal data in public reporting.</p>
          <p><strong className="text-foreground">Technical Data:</strong> IP addresses (anonymized after 30 days), browser type, device type, and error logs are collected for security and debugging purposes.</p>
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-green-700 dark:text-green-400 font-medium">✅ What we do NOT collect: payment information (HireForge is free), government IDs, financial data, or any sensitive personal categories under GDPR Article 9.</p>
          </div>
        </div>
      ),
    },
    {
      id: "how-we-use",
      icon: Eye,
      title: "2. How We Use Your Data",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>We use your data exclusively to:</p>
          <ul className="space-y-2 ml-4 list-disc">
            <li>Provide and improve the HireForge resume analysis service</li>
            <li>Generate your ATS score, keyword analysis, and AI improvement suggestions</li>
            <li>Maintain your Resume History and score trends</li>
            <li>Send transactional emails (account confirmation, password resets) — no marketing emails without explicit opt-in</li>
            <li>Debug errors and improve service reliability</li>
            <li>Comply with legal obligations</li>
          </ul>
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <p className="text-orange-700 dark:text-orange-400 font-medium">🚫 We do NOT use your resume data to train external AI models, sell it to third parties, or share it with advertisers — ever.</p>
          </div>
        </div>
      ),
    },
    {
      id: "data-security",
      icon: Lock,
      title: "3. Data Security",
      color: "text-green-500",
      bg: "bg-green-500/10",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>We take resume data security seriously because your resume contains sensitive professional and personal information. Our security measures include:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Transport Encryption", val: "TLS 1.3 for all data in transit" },
              { title: "Storage Encryption", val: "AES-256 for all data at rest" },
              { title: "Password Hashing", val: "bcrypt with salt rounds ≥ 12" },
              { title: "Access Controls", val: "Role-based, least-privilege access" },
              { title: "AI Processing", val: "Isolated compute — data doesn't leave our infra" },
              { title: "Audit Logs", val: "All data access is logged and monitored" },
            ].map(item => (
              <div key={item.title} className="p-3 rounded-lg bg-card border">
                <p className="font-medium text-foreground text-xs">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "your-rights",
      icon: Shield,
      title: "4. Your Rights",
      color: "text-accent",
      bg: "bg-accent/10",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>You have the following rights regarding your data (applicable under GDPR, CCPA, and similar regulations):</p>
          <ul className="space-y-2 ml-4 list-disc">
            <li><strong className="text-foreground">Access:</strong> Request a copy of all data we hold about you. We'll deliver it within 30 days.</li>
            <li><strong className="text-foreground">Correction:</strong> Update or correct your personal information at any time via your Profile settings.</li>
            <li><strong className="text-foreground">Deletion:</strong> Request complete deletion of your account and all associated data. We'll process this within 7 business days.</li>
            <li><strong className="text-foreground">Portability:</strong> Export your resume analysis data in JSON format at any time.</li>
            <li><strong className="text-foreground">Objection:</strong> Opt out of analytics or withdraw consent for any processing activity.</li>
          </ul>
          <p>To exercise any right, email <a href="mailto:privacy@hireforge.dev" className="text-accent underline">privacy@hireforge.dev</a> or use the in-app deletion option in your Profile settings.</p>
        </div>
      ),
    },
    {
      id: "retention",
      icon: Trash2,
      title: "5. Data Retention",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Data Type</th>
                  <th className="text-left py-2 font-semibold text-foreground">Retention Period</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Account information", "Until account deletion or 3 years of inactivity"],
                  ["Resume text & analysis", "Until you delete them or close your account"],
                  ["ATS score history", "Until account deletion"],
                  ["Usage analytics", "18 months (aggregated/anonymized after 6 months)"],
                  ["IP addresses", "30 days (then anonymized)"],
                  ["Error logs", "90 days"],
                  ["Email communications", "3 years for legal compliance"],
                ].map(([type, period]) => (
                  <tr key={type}>
                    <td className="py-2 pr-4 text-foreground">{type}</td>
                    <td className="py-2 text-muted-foreground">{period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: "contact-privacy",
      icon: Mail,
      title: "6. Contact & Questions",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>For any privacy-related questions, data access requests, or concerns about how we handle your information:</p>
          <p><strong className="text-foreground">Email:</strong> <a href="mailto:privacy@hireforge.dev" className="text-accent underline">privacy@hireforge.dev</a></p>
          <p>The data controller responsible for your information is HireForge.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative px-4 pt-16 pb-12 text-center overflow-hidden">
        <div className="container max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Your resume contains your professional life. We treat it with the respect it deserves.
            This policy explains exactly what we collect, why, and what rights you have.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-4 pb-8">
        <div className="container max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border">
            <h2 className="font-bold mb-3">Table of Contents</h2>
            <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
              {sections.map(s => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-foreground transition-colors">{s.title.replace(/^[0-9]+\. /, "")}</a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-4 pb-16">
        <div className="container max-w-3xl mx-auto space-y-6">
          {sections.map(section => (
            <div key={section.id} id={section.id} className="p-7 rounded-3xl bg-card border space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${section.bg}`}>
                  <section.icon className={`h-5 w-5 ${section.color}`} />
                </div>
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              {section.content}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-muted/40">
        <div className="container max-w-3xl mx-auto text-center space-y-4">
          <p className="text-muted-foreground">Questions about your data?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => navigate("/contact")} className="gap-2">
              <Mail className="h-4 w-4" /> Contact Privacy Team
            </Button>
            <Button variant="outline" onClick={() => navigate("/terms")}>
              Read Terms of Service
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
