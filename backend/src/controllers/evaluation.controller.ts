import type { Response } from 'express';
import { evaluateResume } from '../services/evaluation.service.js';
import type { AuthRequest } from '../middleware/auth.js';

// @desc    Evaluate Resume Text against ATS
// @route   POST /api/evaluate
// @access  Private
export const evaluateResumeText = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { resumeText, jobDescriptionText } = req.body;

        if (!resumeText) {
            res.status(400).json({ message: 'Resume text is required' });
            return;
        }

        const score = await evaluateResume(resumeText, jobDescriptionText);

        res.status(200).json({
            message: 'Resume evaluated successfully',
            score
        });
    } catch (error) {
        console.error('Error evaluating resume:', error);
        res.status(500).json({ message: 'Error evaluating resume', error: (error as Error).message });
    }
};
