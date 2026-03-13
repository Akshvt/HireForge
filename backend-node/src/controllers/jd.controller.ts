import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import { analyzeJDGap } from '../services/jdTargeting.service.js';

// @desc    Target Resume against a JD
// @route   POST /api/jd/target
// @access  Private
export const targetJD = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { resumeText, jobDescriptionText } = req.body;

        if (!resumeText || !jobDescriptionText) {
            res.status(400).json({ message: 'Both resumeText and jobDescriptionText are required' });
            return;
        }

        const gapAnalysis = await analyzeJDGap(resumeText, jobDescriptionText);

        res.status(200).json({
            message: 'JD Targeting analysis successful',
            analysis: gapAnalysis
        });
    } catch (error) {
        console.error('Error analyzing JD gap:', error);
        res.status(500).json({ message: 'Error analyzing JD gap', error: (error as Error).message });
    }
};
