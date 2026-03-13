import express from 'express';
import { targetJD } from '../controllers/jd.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/target', protect, targetJD);

export default router;
