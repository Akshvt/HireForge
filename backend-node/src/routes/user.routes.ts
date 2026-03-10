import express from 'express';
import { protect } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
