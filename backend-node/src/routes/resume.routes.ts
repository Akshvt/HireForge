import express from 'express';
import { uploadResume, getResumeHistory, exportResumePdf, getDashboardStats, deleteResume } from '../controllers/resume.controller.js';
import { protect } from '../middleware/auth.js';
import { uploadConfig } from '../middleware/upload.js';

const router = express.Router();

router.get('/stats', protect, getDashboardStats as any);
router.post('/upload', protect, uploadConfig.single('resume'), uploadResume as any);
router.get('/history', protect, getResumeHistory as any);
router.get('/:id/export', protect, exportResumePdf as any);
router.delete('/:id', protect, deleteResume as any);

export default router;
