import type { Request, Response } from 'express';
import User from '../models/User.js';
import { generateToken, generateRefreshToken } from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            const refreshToken = generateRefreshToken(user.id);
            user.refreshToken = refreshToken;
            await user.save();

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
                refreshToken: refreshToken,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // Assuming matchPassword is a method on the User model
        if (user && (await (user as any).matchPassword(password))) {
            const refreshToken = generateRefreshToken(user.id);
            user.refreshToken = refreshToken;
            await user.save();

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
                refreshToken: refreshToken,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById((req as any).user.id);

        if (user) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                careerPreferences: user.careerPreferences,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
