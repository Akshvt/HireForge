export interface JDTargetingResult {
    matchScore: number;
    matchingKeywords: string[];
    missingKeywords: string[];
}

// Common English stop words to exclude from keyword matching
const STOP_WORDS = new Set([
    // Articles & determiners
    "the", "a", "an", "this", "that", "these", "those", "some", "any", "each",
    "every", "both", "either", "neither", "such", "what", "which", "whose",
    // Pronouns
    "i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us",
    "them", "my", "your", "his", "its", "our", "their", "mine", "yours",
    "myself", "yourself", "himself", "herself", "itself", "ourselves", "themselves",
    // Prepositions & conjunctions
    "in", "on", "at", "to", "for", "of", "with", "by", "from", "as", "into",
    "through", "during", "before", "after", "above", "below", "between", "under",
    "about", "over", "within", "without", "against", "along", "among", "around",
    "and", "but", "or", "nor", "not", "so", "yet", "because", "since", "while",
    "although", "though", "unless", "until", "when", "where", "whether", "than",
    // Common verbs (non-action filler verbs)
    "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
    "do", "does", "did", "will", "would", "shall", "should", "may", "might",
    "can", "could", "must", "need", "make", "made", "making", "get", "got",
    "getting", "take", "took", "taken", "taking", "come", "came", "coming",
    "go", "went", "gone", "going", "know", "knew", "known", "knowing",
    "see", "saw", "seen", "seeing", "give", "gave", "given", "giving",
    "look", "looking", "find", "found", "want", "keep", "let", "think",
    "thought", "say", "said", "tell", "told", "ask", "asked", "work",
    "seem", "feel", "try", "leave", "call", "put", "run", "set",
    // Common adjectives & adverbs
    "able", "also", "very", "well", "just", "only", "also", "more", "most",
    "much", "many", "other", "another", "new", "good", "great", "high", "long",
    "large", "small", "right", "early", "young", "important", "few", "public",
    "same", "last", "next", "first", "second", "third", "then", "now", "here",
    "there", "still", "even", "really", "often", "always", "never", "sometimes",
    "however", "therefore", "already", "quite", "rather", "enough", "less",
    // Common nouns that are NOT skills
    "time", "year", "years", "people", "way", "days", "part", "place", "case",
    "week", "company", "system", "program", "question", "home", "hand", "world",
    "life", "area", "water", "room", "mother", "number", "night", "point",
    "thing", "things", "information", "power", "money", "state", "family",
    "head", "month", "side", "level", "fact", "group", "including", "based",
    "using", "used", "across", "provide", "providing", "ensure", "ensuring",
    "related", "required", "requirements", "responsible", "responsibilities",
    // JD filler words commonly appearing
    "will", "working", "including", "ability", "experience", "role", "position",
    "team", "candidate", "ideal", "preferred", "required", "plus", "strong",
    "understanding", "knowledge", "proficiency", "proficient", "familiarity",
    "familiar", "excellent", "demonstrated", "proven", "minimum", "least",
    "equivalent", "degree", "bachelor", "master", "education", "industry",
    "environment", "environments", "organization", "opportunity", "opportunities",
    "business", "support", "solutions", "solution", "services", "service",
    "best", "practices", "practice", "apply", "help", "join", "offer",
    "looking", "seeking", "like", "various", "several", "multiple",
    "effectively", "efficiently", "closely", "directly", "fully",
    "currently", "overall", "entire", "whole", "complete", "ongoing",
    "appropriate", "specific", "relevant", "necessary", "additional",
    "within", "across", "throughout", "ensure", "maintain", "maintaining",
    "overseeing", "directing", "controlling", "updating", "conception",
    "creation", "evaluation", "cycle", "application", "applications",
]);

// Curated list of meaningful tech/professional keywords to look for
const SKILL_KEYWORDS = [
    // Programming Languages
    "javascript", "typescript", "python", "java", "c++", "c#", "ruby", "go",
    "golang", "rust", "swift", "kotlin", "php", "scala", "perl", "r",
    "objective-c", "dart", "lua", "haskell", "elixir", "clojure", "matlab",
    // Frontend
    "react", "reactjs", "react.js", "angular", "vue", "vuejs", "vue.js",
    "svelte", "nextjs", "next.js", "nuxt", "nuxtjs", "gatsby", "remix",
    "html", "css", "sass", "scss", "less", "tailwind", "tailwindcss",
    "bootstrap", "material-ui", "mui", "chakra", "styled-components",
    "webpack", "vite", "rollup", "parcel", "babel", "eslint", "prettier",
    "redux", "mobx", "zustand", "recoil", "jotai", "pinia",
    "storybook", "figma", "sketch", "adobe", "photoshop", "illustrator",
    // Backend & Frameworks
    "node", "nodejs", "node.js", "express", "expressjs", "fastify", "nestjs",
    "django", "flask", "fastapi", "spring", "springboot", "spring-boot",
    "rails", "laravel", "asp.net", "dotnet", ".net", "gin", "fiber",
    // Databases
    "sql", "mysql", "postgresql", "postgres", "mongodb", "redis", "cassandra",
    "dynamodb", "elasticsearch", "neo4j", "couchdb", "mariadb", "sqlite",
    "oracle", "mssql", "firestore", "supabase", "prisma", "sequelize",
    "mongoose", "typeorm", "knex", "drizzle",
    // Cloud & DevOps
    "aws", "azure", "gcp", "google-cloud", "heroku", "vercel", "netlify",
    "docker", "kubernetes", "k8s", "terraform", "ansible", "puppet", "chef",
    "jenkins", "circleci", "travis", "github-actions", "gitlab-ci",
    "ci/cd", "cicd", "devops", "sre", "linux", "unix", "bash", "shell",
    "nginx", "apache", "cloudflare", "cdn", "lambda", "serverless",
    "ec2", "s3", "rds", "ecs", "eks", "fargate", "cloudwatch",
    // Data & ML/AI
    "machine-learning", "deep-learning", "tensorflow", "pytorch", "keras",
    "scikit-learn", "pandas", "numpy", "matplotlib", "seaborn", "jupyter",
    "nlp", "computer-vision", "opencv", "spark", "hadoop", "kafka",
    "airflow", "dbt", "snowflake", "databricks", "bigquery", "redshift",
    "tableau", "powerbi", "power-bi", "looker", "metabase", "grafana",
    "llm", "langchain", "openai", "chatgpt", "gpt", "bert", "huggingface",
    "mlops", "mlflow", "sagemaker", "vertex-ai",
    // APIs & Protocols
    "rest", "restful", "graphql", "grpc", "websocket", "websockets",
    "oauth", "jwt", "openapi", "swagger", "postman", "api",
    "microservices", "monolith", "event-driven", "rabbitmq", "sqs", "sns",
    // Testing
    "jest", "mocha", "chai", "cypress", "playwright", "selenium",
    "pytest", "junit", "rspec", "testing-library", "vitest", "enzyme",
    "tdd", "bdd", "unit-testing", "integration-testing", "e2e",
    "qa", "quality-assurance",
    // Version Control & Collaboration
    "git", "github", "gitlab", "bitbucket", "svn", "mercurial",
    "jira", "confluence", "notion", "slack", "trello", "asana",
    // Methodologies & Practices
    "agile", "scrum", "kanban", "lean", "waterfall", "sdlc",
    "oop", "functional-programming", "design-patterns", "solid",
    "clean-code", "code-review", "pair-programming",
    "responsive-design", "accessibility", "a11y", "seo",
    "performance-optimization", "caching", "load-balancing",
    // Security
    "security", "cybersecurity", "encryption", "ssl", "tls",
    "penetration-testing", "owasp", "sso", "saml", "ldap",
    "authentication", "authorization",
    // Mobile
    "ios", "android", "react-native", "flutter", "xamarin",
    "mobile-development", "responsive",
    // Other Technical Terms
    "blockchain", "web3", "solidity", "ethereum",
    "iot", "embedded", "fpga", "arduino", "raspberry-pi",
    "ar", "vr", "unity", "unreal",
    // Management & Soft Skills (meaningful ones)
    "leadership", "mentoring", "architecture", "system-design",
    "stakeholder", "cross-functional", "collaboration",
    "analytics", "metrics", "kpi", "roi",
    "product-management", "project-management", "technical-lead",
    "full-stack", "fullstack", "frontend", "backend", "devops",
    // Domain Terms  
    "fintech", "healthcare", "e-commerce", "ecommerce", "saas",
    "b2b", "b2c", "startup", "enterprise",
    "data-engineering", "data-science", "data-analysis",
    "etl", "pipeline", "warehouse", "reporting",
    "deployment", "monitoring", "logging", "observability",
    "scalability", "reliability", "availability",
    "documentation", "technical-writing",
    "automation", "scripting", "tooling", "infrastructure",
    // Software & tools
    "excel", "word", "powerpoint", "sharepoint",
    "salesforce", "hubspot", "zendesk", "intercom",
    "sap", "oracle", "erp", "crm",
];

/**
 * Extract meaningful keywords from text.
 * Uses a two-pronged approach:
 * 1. Check against a curated skills list (catches known tech terms)
 * 2. Filter remaining words through stop words (catches domain-specific terms)
 */
const extractKeywords = (text: string): string[] => {
    const lowerText = text.toLowerCase();
    const keywords = new Set<string>();

    // 1. Match against curated skill keywords (handles multi-word terms too)
    for (const skill of SKILL_KEYWORDS) {
        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
        if (regex.test(lowerText)) {
            keywords.add(skill.toLowerCase());
        }
    }

    // 2. Also extract remaining meaningful words (4+ chars, not stop words, not just numbers)
    const words = lowerText.match(/\b([a-z][a-z0-9._+-]{2,})\b/g) || [];
    for (const word of words) {
        if (!STOP_WORDS.has(word) && !/^\d+$/.test(word) && word.length >= 4) {
            keywords.add(word);
        }
    }

    return [...keywords];
};

export const analyzeJDGap = async (resumeText: string, jdText: string): Promise<JDTargetingResult> => {
    const jdKeywords = [...new Set(extractKeywords(jdText))];
    const resumeKeywords = new Set(extractKeywords(resumeText));

    const matchingKeywords = jdKeywords.filter(word => resumeKeywords.has(word));
    const missingKeywords = jdKeywords.filter(word => !resumeKeywords.has(word));

    const matchScore = jdKeywords.length > 0 ? Math.round((matchingKeywords.length / jdKeywords.length) * 100) : 0;

    return {
        matchScore,
        matchingKeywords: matchingKeywords.slice(0, 15),
        missingKeywords: missingKeywords.slice(0, 15),
    };
};
