import Job from '../models/Job.js';
import fs from 'fs';

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
        const logMsg = `[${new Date().toISOString()}] MatchJobs called with skills: ${userSkills.join(', ')} | Role: ${desiredRole}\n`;
        fs.appendFileSync('match_debug.log', logMsg);
        
        // Normalize user skills
        const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
        console.log('Matching jobs for skills:', normalizedUserSkills);
        console.log('Desired role:', desiredRole);

        // 1. Fetch relevant jobs from MongoDB
        // We look for jobs that have at least one overlapping skill OR match the desired role
        const query: any = {};
        if (normalizedUserSkills.length > 0) {
            query.skills = { $in: normalizedUserSkills };
        }

        if (desiredRole === 'INTERNSHIP') {
            query.title = { $regex: 'intern', $options: 'i' };
        } else if (desiredRole === 'FRESHER') {
            query.title = { $not: { $regex: 'intern', $options: 'i' } };
        } else if (desiredRole) {
            query.$or = [
                { title: { $regex: desiredRole, $options: 'i' } },
                { description: { $regex: desiredRole, $options: 'i' } }
            ];
        }

        console.log('Generated MongoDB query:', JSON.stringify(query));

        const jobs = await Job.find(query).limit(50);
        console.log(`Found ${jobs.length} potential job matches in DB`);

        const recommendations: JobRecommendation[] = [];

        for (const job of jobs) {
            // Calculate skill overlap
            const matchingSkills = job.skills.filter((skill: string) =>
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

            console.log(`Job: ${job.title}, Matching Skills: ${matchingSkills.join(', ')}, Score: ${matchScore}`);

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

        console.log(`Returning ${recommendations.length} recommendations after filtering`);
        // Sort by highest match score
        return recommendations.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
        console.error('Error in matchJobs service:', error);
        throw error;
    }
};
