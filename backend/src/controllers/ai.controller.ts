import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
import {
    rewriteResume,
    generateDocxFromText,
    generateMarkdown,
    generatePdfForDownload,
} from '../services/aiRewriter.service.js';

// @desc    Rewrite resume using AI
// @route   POST /api/ai/rewrite
// @access  Private
export const rewriteResumeController = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { resumeText, tone, suggestions } = req.body;

        if (!resumeText || resumeText.length < 50) {
            res.status(400).json({ message: 'Resume text is required (min 50 characters).' });
            return;
        }

        const validTones = ['professional', 'technical', 'creative', 'executive'];
        const selectedTone = validTones.includes(tone) ? tone : 'professional';

        const rewrittenText = await rewriteResume(resumeText, selectedTone, suggestions || []);

        res.status(200).json({
            message: 'Resume rewritten successfully',
            rewrittenText,
        });
    } catch (error) {
        console.error('Error rewriting resume:', error);
        res.status(500).json({
            message: 'Failed to rewrite resume. Please try again.',
            error: (error as Error).message,
        });
    }
};

// @desc    Download rewritten resume in various formats
// @route   POST /api/ai/download
// @access  Private
export const downloadResumeController = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { text, format } = req.body;

        if (!text) {
            res.status(400).json({ message: 'Resume text is required.' });
            return;
        }

        if (format === 'pdf') {
            const pdfBuffer = await generatePdfForDownload(text);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=HireForge_Resume.pdf');
            res.send(pdfBuffer);
        } else if (format === 'docx') {
            const docxBuffer = await generateDocxFromText(text);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename=HireForge_Resume.docx');
            res.send(docxBuffer);
        } else if (format === 'md') {
            const markdown = generateMarkdown(text);
            res.setHeader('Content-Type', 'text/markdown');
            res.setHeader('Content-Disposition', 'attachment; filename=HireForge_Resume.md');
            res.send(markdown);
        } else {
            res.status(400).json({ message: 'Invalid format. Use: pdf, docx, or md.' });
        }
    } catch (error) {
        console.error('Error generating download:', error);
        res.status(500).json({
            message: 'Failed to generate download.',
            error: (error as Error).message,
        });
    }
};
