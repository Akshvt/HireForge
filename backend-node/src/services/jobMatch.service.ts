import Job from '../models/Job.js';

export interface JobRecommendation {
    jobId: string;
    title: string;
    description: string;
    company: string;
    matchScore: number;
    matchingSkills: string[];
}

export const matchJobs = async (userSkills: string[], desiredRole: string): Promise<JobRecommendation[]> => {
    try {
        // Normalize user skills
        const normalizedUserSkills = userSkills.map(s => s.toLowerCase());

        // 1. Fetch relevant jobs from MongoDB
        // We look for jobs that have at least one overlapping skill OR match the desired role
        const query: any = {};
        if (normalizedUserSkills.length > 0) {
            query.skills = { $in: normalizedUserSkills };
        }

        if (desiredRole) {
            query.$or = [
                { title: { $regex: desiredRole, $options: 'i' } },
                { description: { $regex: desiredRole, $options: 'i' } }
            ];
        }

        const jobs = await Job.find(query).limit(20);

        const recommendations: JobRecommendation[] = [];

        for (const job of jobs) {
            // Calculate skill overlap
            const matchingSkills = job.skills.filter(skill =>
                normalizedUserSkills.includes(skill.toLowerCase())
            );

            // Calculate match score
            // Base score from skill overlap
            let matchScore = job.skills.length > 0
                ? Math.round((matchingSkills.length / job.skills.length) * 80)
                : 0;

            // Boost score if title matches desired role
            if (desiredRole && job.title.toLowerCase().includes(desiredRole.toLowerCase())) {
                matchScore += 20;
            }

            // Cap at 100
            matchScore = Math.min(100, matchScore);

            // Only recommend if there's at least some match or it's a role match
            if (matchScore > 10) {
                recommendations.push({
                    jobId: (job._id as any).toString(),
                    title: job.title,
                    description: job.description,
                    company: job.company || 'HireForge Partner',
                    matchScore: matchScore,
                    matchingSkills
                });
            }
        }

        // Sort by highest match score
        return recommendations.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
        console.error('Error in matchJobs service:', error);
        throw error;
    }
};
