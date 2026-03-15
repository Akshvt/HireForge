import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
        expiresIn: '15m',
    });
};

export const generateRefreshToken = (id: string) => {
    return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
        expiresIn: '7d',
    });
};
