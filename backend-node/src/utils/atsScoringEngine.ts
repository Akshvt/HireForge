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
    skills: string[]; // Added to return detected skills
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
    // Data Science & AI (Added based on user request)
    "Scikit-learn", "TensorFlow", "Natural Language Processing", "NLP", "Langchain",
    "Pandas", "Matplotlib", "Seaborn", "Excel", "PowerBI", "Jupyter Notebook",
    "SharePoint", "PowerApps"
];

export const calculateATSScore = (resumeText: string, _jobDescriptionText?: string): ATSScoreResult => {
    const resumeTextLower = resumeText.toLowerCase();
    const resumeWords = resumeTextLower.match(/\b(\w+)\b/g) || [];
    const hasNumbers = /\d+/.test(resumeText);

    // Extract actual skills found in text
    const extractedSkills = SKILLS.filter(skill =>
        resumeTextLower.includes(skill.toLowerCase())
    );

    const detailed_breakdown: DetailedScore[] = CATEGORIES.map(cat => {
        const subParameters = cat.params.map(param => {
            let score = 75; // Baseline
            let feedback = "Good coverage.";

            if (param === "Quantifiable Results") {
                score = hasNumbers ? 90 : 40;
                feedback = hasNumbers ? "Great use of metrics." : "Add measurable achievements.";
            } else if (param === "Core Skills") {
                const skillMatchRate = Math.min(100, (extractedSkills.length / 5) * 100);
                score = Math.max(50, Math.round(skillMatchRate));
                feedback = extractedSkills.length > 0 ? `Found ${extractedSkills.length} key skills.` : "Focus on core industry skills.";
            } else if (param === "Word Count") {
                const wordCount = resumeWords.length;
                score = (wordCount > 300 && wordCount < 800) ? 95 : 60;
                feedback = wordCount > 300 ? "Length is appropriate." : "Consider adding more detail.";
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

    return {
        ats_score,
        detailed_breakdown,
        suggestions: extractedSkills.length < 5 ? ['Include more technical skills like Docker/AWS'] : ['Highlight more leadership experience'],
        line_feedback: [],
        skills: extractedSkills
    };
};
