import writeGood from 'write-good';

const SKILL_NORMALIZATION_MAP: Record<string, string> = {
    "reactjs": "React",
    "react.js": "React",
    "node": "Node.js",
    "nodejs": "Node.js",
    "python3": "Python",
    "mongodb": "MongoDB",
    "mongo": "MongoDB",
    "javascript": "JavaScript",
    "js": "JavaScript",
    "typescript": "TypeScript",
    "ts": "TypeScript",
};

const SECTION_MARKERS: Record<string, string[]> = {
    "Experience": ["experience", "work history", "employment", "professional background"],
    "Education": ["education", "academic", "university", "college"],
    "Skills": ["skills", "technical skills", "competencies", "expertise"],
    "Projects": ["projects", "personal projects", "portfolio"],
    "Certifications": ["certifications", "licenses", "awards"],
    "Contact": ["contact", "personal info", "email", "phone"]
};

const ACTION_VERBS = [
    "built", "developed", "implemented", "designed", "optimized", "led", "improved", "delivered",
    "created", "managed", "coordinated", "analyzed", "streamlined", "accelerated", "facilitated"
];

const BUZZWORDS = [
    "hardworking", "team player", "go-getter", "passionate", "motivated", "detail-oriented",
    "self-starter", "results-driven", "synergy", "think outside the box", "thought leader"
];

const ACHIEVEMENT_KEYWORDS = [
    "increased", "reduced", "saved", "revenue", "growth", "kpi", "roi", "launched",
    "scaled", "negotiated", "transformed", "mentored", "surpassed", "automated"
];

export interface DetailedScore {
    category: string;
    score: number;
    subParameters: { name: string; score: number; feedback: string }[];
}

export interface ATSScoreResult {
    ats_score: number;
    detailed_breakdown: DetailedScore[];
    suggestions: string[];
    line_feedback: any[];
    skills: string[];
    sections_found: string[];
    action_verbs_found: string[];
    buzzwords_found: string[];
    years_detected: number[];
    timeline_gaps: string[];
}

const CATEGORIES = [
    {
        name: "Formatting & Structure",
        params: ["Section Headings", "White Space", "Font Consistency", "Margins", "Page Count"]
    },
    {
        name: "Content Quality",
        params: ["Action Verbs", "Quantifiable Results", "Word Count", "Buzzword Usage", "Spelling & Grammar"]
    },
    {
        name: "Skills & Keywords",
        params: ["Core Skills", "Technical Keywords", "Soft Skills", "Certification Mention", "Skill Density"]
    },
    {
        name: "Recruitability",
        params: ["Education", "Experience Depth", "Job Titles", "Timeline Gaps", "Contact Info"]
    }
];

const SKILLS = [
    "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "Python", "FastAPI",
    "SQL", "PostgreSQL", "Docker", "AWS", "Google Cloud", "Git", "Agile", "Scrum",
    "Tailwind CSS", "HTML", "CSS", "REST API", "GraphQL", "Azure", "Kubernetes",
    "Scikit-learn", "TensorFlow", "NLP", "Langchain",
    "Pandas", "Matplotlib", "Seaborn", "Excel", "PowerBI"
];

export const calculateATSScore = async (resumeText: string, _jobDescriptionText?: string): Promise<ATSScoreResult> => {
    const resumeTextLower = resumeText.toLowerCase();
    const resumeWords = resumeTextLower.match(/\b(\w+)\b/g) || [];

    // 1. Detect Sections
    const sections_found: string[] = [];
    (Object.entries(SECTION_MARKERS) as [string, string[]][]).forEach(([section, markers]) => {
        if (markers.some((marker: string) => resumeTextLower.includes(marker))) {
            sections_found.push(section);
        }
    });

    // 2. Extract Skills with Regex & Normalization
    const foundSkillsSet = new Set<string>();
    SKILLS.forEach(skill => {
        const regex = new RegExp(`\\b${skill.replace(".", "\\.")}\\b`, "gi");
        if (regex.test(resumeTextLower)) {
            foundSkillsSet.add(skill);
        }
    });

    (Object.entries(SKILL_NORMALIZATION_MAP) as [string, string][]).forEach(([alias, canonical]) => {
        const regex = new RegExp(`\\b${alias.replace(".", "\\.")}\\b`, "gi");
        if (regex.test(resumeTextLower)) {
            foundSkillsSet.add(canonical);
        }
    });

    const extractedSkills = Array.from(foundSkillsSet);

    // 3. Detect Action Verbs and Buzzwords
    const action_verbs_found = ACTION_VERBS.filter(verb => 
        new RegExp(`\\b${verb}\\b`, "gi").test(resumeTextLower)
    );
    const buzzwords_found = BUZZWORDS.filter(buzz => 
        new RegExp(`\\b${buzz}\\b`, "gi").test(resumeTextLower)
    );

    // 4. Contact Info Validation
    const hasEmail = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}/.test(resumeText);
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
    const hasLinkedIn = /linkedin\.com\/in\/[\w-]+/.test(resumeTextLower);

    // 5. Achievement Detection & Bullet Quality
    const achievement_matches = ACHIEVEMENT_KEYWORDS.filter(word => 
        new RegExp(`\\b${word}\\b`, "gi").test(resumeTextLower)
    );
    const bulletPoints = resumeText.split("\n").filter(line => /^[\s]*[-*•\d.]/.test(line));
    const qualityBullets = bulletPoints.filter(bp => /[\d%]+|\$|revenue|growth/gi.test(bp));

    // 6. Timeline Gap Detection
    const yearRegex = /\b(20\d{2}|19\d{2})\b/g;
    const years = Array.from(new Set(resumeText.match(yearRegex)?.map(Number) || [])).sort((a, b) => b - a);
    const timeline_gaps: string[] = [];
    if (years.length > 1) {
        for (let i = 0; i < years.length - 1; i++) {
            const year1 = years[i];
            const year2 = years[i + 1];
            if (year1 !== undefined && year2 !== undefined && year1 - year2 > 1) {
                timeline_gaps.push(`${year2} - ${year1}`);
            }
        }
    }

    // 7. Linguistic Analysis (Harper & Write-good)
    let spellingErrors: any[] = [];
    let grammarErrors: any[] = [];
    let styleIssues: any[] = [];

    // NOTE: harper.js is disabled due to WASM path issues on Windows.
    // Using write-good for style analysis instead.
    try {
        styleIssues = writeGood(resumeText);
    } catch (wgError) {
        console.error("Write-good analysis failed:", wgError);
    }

    const detailed_breakdown: DetailedScore[] = CATEGORIES.map(cat => {
        const subParameters = cat.params.map(param => {
            let score = 65; // Lowered baseline for stricter scoring
            let feedback = "Good coverage.";

            if (param === "Section Headings") {
                const coverage = (sections_found.length / Object.keys(SECTION_MARKERS).length) * 100;
                score = Math.max(25, Math.round(coverage)); // Lowered floor from 40
                feedback = sections_found.length >= 4 ? "Standard sections detected." : "Missing key resume sections.";
            } else if (param === "Action Verbs") {
                score = Math.min(100, (action_verbs_found.length / 8) * 100); // Increased target from 5 to 8
                feedback = action_verbs_found.length >= 3 ? "Strong use of impact verbs." : "Use more action verbs like 'Built', 'Optimized'.";
            } else if (param === "Buzzword Usage") {
                score = Math.max(0, 100 - (buzzwords_found.length * 30)); // Increased penalty from 20 to 30
                feedback = buzzwords_found.length === 0 ? "Direct and professional tone." : "Reduce generic buzzwords.";
            } else if (param === "Quantifiable Results") {
                const achievementRate = Math.min(100, (qualityBullets.length / (bulletPoints.length || 1)) * 100 + achievement_matches.length * 10);
                score = Math.max(25, Math.round(achievementRate)); // Lowered floor from 40
                feedback = qualityBullets.length > 0 ? "Metrics detected in bullets." : "Add measurable achievements (%, $, numbers).";
            } else if (param === "Core Skills") {
                const skillMatchRate = Math.min(100, (extractedSkills.length / 15) * 100); // Increased target from 10 to 15
                score = Math.max(25, Math.round(skillMatchRate)); // Lowered floor from 40
                feedback = extractedSkills.length > 5 ? `Strong skill set (${extractedSkills.length}).` : "Include more core industry skills.";
            } else if (param === "Word Count") {
                const wordCount = resumeWords.length;
                score = (wordCount > 400 && wordCount < 1000) ? 95 : 60;
                feedback = wordCount > 400 ? "Length is optimal." : "Expand on experience and achievements.";
            } else if (param === "Skill Density") {
                const density = extractedSkills.length / (resumeWords.length || 1);
                score = (density > 0.02 && density < 0.1) ? 95 : 60;
                feedback = (density > 0.1) ? "Avoid keyword stuffing." : "Good skill-to-word ratio.";
            } else if (param === "Timeline Gaps") {
                score = timeline_gaps.length === 0 ? 95 : 75; // Softer penalty (increased from 50 to 75)
                feedback = timeline_gaps.length === 0 ? "Consistent work history." : `Detected gaps: ${timeline_gaps.join(", ")}.`;
            } else if (param === "Contact Info") {
                const infoPoints = [hasEmail, hasPhone, hasLinkedIn].filter(Boolean).length;
                score = (infoPoints / 3) * 100;
                feedback = infoPoints === 3 ? "Complete contact info." : "Missing Email, Phone, or LinkedIn link.";
            } else if (param === "Spelling & Grammar") {
                const totalErrors = spellingErrors.length + grammarErrors.length;
                score = Math.max(0, 100 - (totalErrors * 10) - (styleIssues.length * 5));
                if (totalErrors === 0 && styleIssues.length === 0) {
                    feedback = "Perfect linguistic quality.";
                } else {
                    feedback = `${spellingErrors.length} typos, ${grammarErrors.length} grammar issues, and ${styleIssues.length} style suggestions.`;
                }
            }

            return { name: param, score, feedback };
        });

        const avgScore = Math.round(subParameters.reduce((acc, p) => acc + p.score, 0) / subParameters.length);

        return {
            category: cat.name,
            score: avgScore,
            subParameters
        };
    });

    const ats_score = Math.round(detailed_breakdown.reduce((acc, d) => acc + d.score, 0) / detailed_breakdown.length);

    // Dynamic suggestions based on findings
    const suggestions: string[] = [];
    if (extractedSkills.length < 5) suggestions.push("Add more technical keywords relevant to the job.");
    if (!sections_found.includes("Projects")) suggestions.push("Add a Projects section to showcase practical work.");
    if (qualityBullets.length === 0) suggestions.push("Quantify achievements in your bullet points (e.g., 'Reduced costs by 20%').");
    if (timeline_gaps.length > 0) suggestions.push("Explain the gaps in your employment timeline.");
    if (buzzwords_found.length > 2) suggestions.push("Replace generic buzzwords with specific achievements.");
    if (!hasLinkedIn) suggestions.push("Add your LinkedIn profile URL.");

    // Add linguistic suggestions
    if (spellingErrors.length > 0) suggestions.push(`Fix spelling errors: ${spellingErrors.slice(0, 2).map((m: any) => m.message()).join(", ")}`);
    if (grammarErrors.length > 0) suggestions.push(`Improve grammar: ${grammarErrors.slice(0, 2).map((m: any) => m.message()).join(", ")}`);
    if (styleIssues.length > 0) suggestions.push(`Refine writing style: ${styleIssues.slice(0, 2).map(m => m.reason).join(", ")}`);

    return {
        ats_score,
        detailed_breakdown,
        suggestions: suggestions.length > 0 ? suggestions : ["Highlight more leadership experience"],
        line_feedback: [],
        skills: extractedSkills,
        sections_found,
        action_verbs_found,
        buzzwords_found,
        years_detected: years,
        timeline_gaps
    };
};
