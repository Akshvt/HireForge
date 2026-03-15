import rateLimit from 'express-rate-limit';

// Global API Rate Limiter: 100 requests per 15 minutes
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        error: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter Rate Limiter for Authentication routes: 20 requests per hour
export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: {
        status: 429,
        error: 'Too many authentication attempts, please try again after an hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
