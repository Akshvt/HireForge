import express from 'express';
import { protect } from '../middleware/auth.js';
import { rewriteResumeController, downloadResumeController } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/rewrite', protect, rewriteResumeController);
router.post('/download', protect, downloadResumeController);

export default router;
