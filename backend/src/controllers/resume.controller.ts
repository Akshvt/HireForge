import type { Response } from 'express';
import { parseResume } from '../services/resumeParser.service.js';
import { generatePdfFromText } from '../services/pdfExport.service.js';
import type { AuthRequest } from '../middleware/auth.js';
import Resume from '../models/Resume.js';
import User from '../models/User.js';

import { evaluateResume } from '../services/evaluation.service.js';
import { matchJobs } from '../services/jobMatch.service.js';

// @desc    Upload & Parse Resume, creating a new version
// @route   POST /api/resumes/upload
// @access  Private
export const uploadResume = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const fileBuffer = req.file.buffer;
        const mimeType = req.file.mimetype;

        // Parse the resume
        const parsedText = await parseResume(fileBuffer, mimeType);

        // Calculate ATS Score and Extract Skills
        const evaluation = await evaluateResume(parsedText);

        // Find highest existing version count for user
        const previousResume = await Resume.findOne({ user: req.user._id }).sort({ version: -1 });
        const newVersion = previousResume ? previousResume.version + 1 : 1;

        // Save to database
        const resumeRecord = await Resume.create({
            user: req.user._id,
            version: newVersion,
            originalText: parsedText,
            metrics: {
                atsScore: evaluation.ats_score,
                detailedBreakdown: evaluation.detailed_breakdown,
                suggestions: evaluation.suggestions
            }
        });

        res.status(200).json({
            message: 'Resume uploaded and parsed successfully',
            version: newVersion,
            resumeId: resumeRecord._id,
            parsedText,
            metrics: resumeRecord.metrics,
            skills: evaluation.skills // Added to satisfy frontend
        });
    } catch (error) {
        console.error('Error processing resume:', error);
        res.status(500).json({ message: 'Error processing resume', error: (error as Error).message });
    }
};

// @desc    Get aggregate dashboard statistics
// @route   GET /api/resumes/stats
// @access  Private
export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user._id;

        const totalResumes = await Resume.countDocuments({ user: userId });

        const resumesWithScores = await Resume.find({
            user: userId,
            'metrics.atsScore': { $exists: true }
        });

        const totalAtsScore = resumesWithScores.reduce((acc, r) => acc + (r.metrics?.atsScore || 0), 0);
        const averageAts = totalResumes > 0 ? Math.round(totalAtsScore / resumesWithScores.length || 0) : 0;

        const aiRewritesCount = await Resume.countDocuments({
            user: userId,
            improvedText: { $exists: true, $ne: '' }
        });

        // Use real job matching count based on career preferences
        const user = await User.findById(userId);
        let jobMatchesCount = 0;

        if (user && user.careerPreferences && user.careerPreferences.targetRole) {
            const matches = await matchJobs([], user.careerPreferences.targetRole);
            jobMatchesCount = matches.length;
        } else {
            // Fallback count if no role is set
            jobMatchesCount = totalResumes > 0 ? 5 : 0;
        }

        res.status(200).json({
            totalResumes,
            averageAts: `${averageAts}%`,
            jobMatchesCount,
            aiRewritesCount
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Error fetching dashboard stats', error: (error as Error).message });
    }
};

// @desc    Get user's resume history
// @route   GET /api/resumes/history
// @access  Private
export const getResumeHistory = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const history = await Resume.find({ user: req.user._id })
            .sort({ version: -1 })
            .select('-originalText -improvedText'); // Don't return full text strings in the listing

        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error: (error as Error).message });
    }
};

// @desc    Export a resume as PDF
// @route   GET /api/resumes/:id/export
// @access  Private
export const exportResumePdf = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const resume = await Resume.findOne({ _id: req.params['id'] as any, user: req.user._id });

        if (!resume) {
            res.status(404).json({ message: 'Resume version not found' });
            return;
        }

        // Default strictly to improved text if available, fallback to original
        const textToExport = resume.improvedText || resume.originalText;

        const pdfBuffer = await generatePdfFromText(textToExport, resume.metrics);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume-v${resume.version}.pdf`,
            'Content-Length': pdfBuffer.length
        });

        res.status(200).end(pdfBuffer);
    } catch (error) {
        res.status(500).json({ message: 'Error generating PDF', error: (error as Error).message });
    }
};

// @desc    Delete a resume version
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const resume = await Resume.findOneAndDelete({ _id: req.params['id'] as any, user: req.user._id });

        if (!resume) {
            res.status(404).json({ message: 'Resume version not found' });
            return;
        }

        res.status(200).json({ message: 'Resume version deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resume', error: (error as Error).message });
    }
};
