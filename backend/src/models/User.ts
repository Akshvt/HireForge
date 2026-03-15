import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        careerPreferences: {
            targetRole: { type: String, default: '' },
            industry: { type: String, default: '' },
            experienceLevel: { type: String, default: '' },
            location: { type: String, default: '' },
        },
        refreshToken: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function () {
    const user = this as any;
    if (!user.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
});

(userSchema.methods as any).matchPassword = async function (this: any, enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
