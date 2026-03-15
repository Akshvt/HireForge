import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import { matchJobs } from '../services/jobMatch.service.js';

// @desc    Get job recommendations based on skills
// @route   POST /api/jobs/match
// @access  Private
export const getJobMatches = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { skills, desiredRole } = req.body;

        if (!skills || !Array.isArray(skills)) {
            res.status(400).json({ message: 'Skills array is required' });
            return;
        }

        const recommendations = await matchJobs(skills, desiredRole || '');

        res.status(200).json({
            message: 'Job matching successful',
            matches: recommendations
        });
    } catch (error) {
        console.error('Error matching jobs:', error);
        res.status(500).json({ message: 'Error recommending jobs', error: (error as Error).message });
    }
};
