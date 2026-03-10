import { calculateATSScore, ATSScoreResult } from '../utils/atsScoringEngine.js';

export const evaluateResume = async (resumeText: string, jobDescriptionText?: string): Promise<ATSScoreResult> => {
    // Orchestrate evaluation (could insert database logging, LLM calls, etc.)
    return calculateATSScore(resumeText, jobDescriptionText);
};
