import express from 'express';
import { evaluateResumeText } from '../controllers/evaluation.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, evaluateResumeText);

export default router;
