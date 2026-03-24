import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import evaluationRoutes from './routes/evaluation.routes.js';
import jdRoutes from './routes/jd.routes.js';
import jobRoutes from './routes/jobMatch.routes.js';
import careerRoutes from './routes/career.routes.js';
import userRoutes from './routes/user.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { globalLimiter, authLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

// Ensure Database is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database connection failed", err);
    res.status(500).json({ message: "Internal Server Error: Database connection failed" });
  }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

if (process.env['NODE_ENV'] !== 'production') {
  app.use(morgan('dev'));
}

// Apply global rate limiter to all API routes
app.use('/api', globalLimiter);

// Routing
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/evaluate', evaluationRoutes);
app.use('/api/jd', jdRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

export default app;
