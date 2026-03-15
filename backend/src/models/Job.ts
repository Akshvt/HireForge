import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
    title: string;
    description: string;
    skills: string[];
    marketDemand: 'high' | 'medium' | 'low';
    datePosted: Date;
    company?: string;
    location?: string;
    createdAt: Date;
    updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
    {
        title: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
            index: true,
        },
        marketDemand: {
            type: String,
            enum: ['high', 'medium', 'low'],
            default: 'medium',
        },
        datePosted: {
            type: Date,
            default: Date.now,
        },
        company: {
            type: String,
            default: 'HireForge Partner',
        },
        location: {
            type: String,
            default: 'Remote',
        },
    },
    {
        timestamps: true,
    }
);

// Semantic search-like index for title
jobSchema.index({ title: 'text', description: 'text' });

const Job = mongoose.model<IJob>('Job', jobSchema);

export default Job;
