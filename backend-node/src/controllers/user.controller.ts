import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id).select('-password');

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.avatar = req.body.avatar || user.avatar;

            if (req.body.careerPreferences) {
                user.careerPreferences = {
                    ...user.careerPreferences,
                    ...req.body.careerPreferences
                };
            }

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                careerPreferences: updatedUser.careerPreferences,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};
