import express from 'express';
import { getJobMatches } from '../controllers/jobMatch.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/match', protect, getJobMatches);

export default router;
