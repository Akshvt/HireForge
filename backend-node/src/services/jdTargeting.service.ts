export interface JDTargetingResult {
    matchScore: number;
    matchingKeywords: string[];
    missingKeywords: string[];
}

export const analyzeJDGap = async (resumeText: string, jdText: string): Promise<JDTargetingResult> => {
    // Simple heuristic-based extraction. Would ideally use NLP in production.
    const extractWords = (text: string) => {
        return text.toLowerCase().match(/\b(\w{4,})\b/g) || [] as string[]; // Words with 4+ characters
    };

    const jdWords = [...new Set(extractWords(jdText))];
    const resumeWords = [...new Set(extractWords(resumeText))];

    const matchingKeywords = jdWords.filter(word => resumeWords.includes(word));
    const missingKeywords = jdWords.filter(word => !resumeWords.includes(word));

    const matchScore = jdWords.length > 0 ? Math.round((matchingKeywords.length / jdWords.length) * 100) : 0;

    return {
        matchScore,
        matchingKeywords: matchingKeywords.slice(0, 15), // Limiting for mock response constraints
        missingKeywords: missingKeywords.slice(0, 15),
    };
};
