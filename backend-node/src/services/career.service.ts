export interface CareerStep {
    current_role: string;
    next_role: string;
    missing_skills: string[];
    learning_resources: Record<string, {
        youtube?: string;
        coursera?: string;
        udemy?: string;
        gfg?: string;
        w3schools?: string;
    }>;
}

export interface CareerRecommendation {
    primary_path: CareerStep;
    tech_paths: CareerStep[];
    non_tech_paths: CareerStep[];
}

export const generateCareerPath = async (userSkills: string[]): Promise<CareerRecommendation> => {
    // Mock logic for career progression
    const skillsLower = userSkills.map(s => s.toLowerCase());

    const isDev = skillsLower.some(s => s.includes('react') || s.includes('node') || s.includes('typescript') || s.includes('javascript'));

    // Primary Path
    const primary_path: CareerStep = {
        current_role: isDev ? "Junior Developer" : "Analyst",
        next_role: isDev ? "Senior Software Engineer" : "Senior Analyst",
        missing_skills: ["System Design", "Cloud Architecture (AWS)", "Kubernetes"],
        learning_resources: {
            "System Design": {
                youtube: "https://youtube.com/results?search_query=system+design+basics",
                coursera: "https://www.coursera.org/learn/software-architecture",
                gfg: "https://www.geeksforgeeks.org/system-design-tutorial/"
            },
            "Cloud Architecture (AWS)": {
                youtube: "https://youtube.com/results?search_query=aws+certified+solutions+architect",
                udemy: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
                w3schools: "https://www.w3schools.com/aws/"
            }
        }
    };

    // Tech Paths
    const tech_paths: CareerStep[] = [
        {
            current_role: isDev ? "Junior Developer" : "Analyst",
            next_role: "Full Stack Architect",
            missing_skills: ["DevOps", "GraphQL", "Next.js"],
            learning_resources: {
                "DevOps": { youtube: "https://youtube.com/results?search_query=devops+roadmap" }
            }
        }
    ];

    // Non-Tech Paths
    const non_tech_paths: CareerStep[] = [
        {
            current_role: isDev ? "Junior Developer" : "Analyst",
            next_role: "Technical Product Manager",
            missing_skills: ["Product Strategy", "Agile Management", "User Research"],
            learning_resources: {
                "Product Strategy": { coursera: "https://www.coursera.org/specializations/product-management" }
            }
        }
    ];

    return {
        primary_path,
        tech_paths,
        non_tech_paths
    };
};
