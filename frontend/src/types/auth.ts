export interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    careerPreferences?: {
        targetRole?: string;
        industry?: string;
        experienceLevel?: string;
        location?: string;
    };
}

export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    token: string;
    refreshToken: string;
}
