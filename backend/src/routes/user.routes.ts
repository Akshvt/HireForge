import express from 'express';
import { protect } from '../middleware/auth.js';
import { getProfile, updateProfile, changePassword, deleteAccount } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.delete('/account', protect, deleteAccount);

export default router;
