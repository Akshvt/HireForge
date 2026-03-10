import express from 'express';
import { getCareerRecommendations } from '../controllers/career.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/recommend', protect, getCareerRecommendations);

export default router;
