import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import { generateCareerPath } from '../services/career.service.js';

// @desc    Get career path recommendations
// @route   POST /api/career/recommend
// @access  Private
export const getCareerRecommendations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { skills } = req.body;

        if (!skills || !Array.isArray(skills)) {
            res.status(400).json({ message: 'Skills array is required' });
            return;
        }

        const careerPath = await generateCareerPath(skills);

        res.status(200).json({
            message: 'Career path generated successfully',
            careerPath
        });
    } catch (error) {
        console.error('Error generating career path:', error);
        res.status(500).json({ message: 'Error generating career path', error: (error as Error).message });
    }
};
