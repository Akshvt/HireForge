import { GoogleGenerativeAI } from '@google/generative-ai';

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

const genAI = new GoogleGenerativeAI(process.env['GEMINI_API_KEY'] || '');

export const generateCareerPath = async (userSkills: string[]): Promise<CareerRecommendation> => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        
        const prompt = `You are an expert technical career advisor.
Based on the following user skills: ${userSkills.join(', ')}

Generate a career progression roadmap in STRICT JSON FORMAT.
The JSON must match this exact TypeScript interface structure:
{
    "primary_path": {
        "current_role": "Predicted current role based on skills",
        "next_role": "Logical next senior role",
        "missing_skills": ["Skill1", "Skill2", "Skill3"],
        "learning_resources": {
            "Skill1": { "youtube": "url", "coursera": "url", "udemy": "url", "gfg": "url", "w3schools": "url" }
        }
    },
    "tech_paths": [
        {
            "current_role": "Current role",
            "next_role": "An alternate deeper technical role",
            "missing_skills": ["SkillA", "SkillB"],
            "learning_resources": { ... }
        }
    ],
    "non_tech_paths": [
        {
            "current_role": "Current role",
            "next_role": "A leadership or product role (e.g. Technical Product Manager)",
            "missing_skills": ["SkillX", "SkillY"],
            "learning_resources": { ... }
        }
    ]
}

RULES:
1. "learning_resources" must be an object where keys are the EXACT STRINGS from "missing_skills".
2. Only include 1-3 missing skills per path.
3. Provide realistic search URLs for the resources (e.g. "https://youtube.com/results?search_query=learn+system+design").
4. Return ONLY valid JSON. No markdown formatting, no backticks, no explanations.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Clean the response text to extract just the JSON
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Failed to parse career path JSON from AI response');
        }
        
        const careerData = JSON.parse(jsonMatch[0]) as CareerRecommendation;
        return careerData;
    } catch (error) {
        console.error('Error generating AI career path, falling back to basic mapping:', error);
        
        // Fallback to basic mapping if AI fails
        const skillsLower = userSkills.map(s => s.toLowerCase());
        const isDev = skillsLower.some(s => s.includes('react') || s.includes('node') || s.includes('typescript') || s.includes('javascript') || s.includes('python'));

        return {
            primary_path: {
                current_role: isDev ? "Software Developer" : "Data/Business Analyst",
                next_role: isDev ? "Senior Software Engineer" : "Senior Analyst",
                missing_skills: ["System Design", "Cloud Architecture (AWS)"],
                learning_resources: {
                    "System Design": {
                        youtube: "https://youtube.com/results?search_query=system+design+basics"
                    },
                    "Cloud Architecture (AWS)": {
                        youtube: "https://youtube.com/results?search_query=aws+certified"
                    }
                }
            },
            tech_paths: [],
            non_tech_paths: []
        };
    }
};
