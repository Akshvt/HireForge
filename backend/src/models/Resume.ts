import mongoose, { Document, Schema } from 'mongoose';

export interface IResume extends Document {
    user: mongoose.Types.ObjectId;
    version: number;
    originalText: string;
    improvedText?: string;
    metrics?: {
        atsScore: number;
        [key: string]: any;
    };
    createdAt: Date;
    updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        version: {
            type: Number,
            required: true,
            default: 1,
        },
        originalText: {
            type: String,
            required: true,
        },
        improvedText: {
            type: String,
        },
        metrics: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
resumeSchema.index({ user: 1, version: -1 });

const Resume = mongoose.model<IResume>('Resume', resumeSchema);

export default Resume;
