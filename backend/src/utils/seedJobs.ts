import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import Job from '../models/Job.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const seedJobs = async () => {
    try {
        await connectDB();

        // Clear existing jobs
        await Job.deleteMany({});
        console.log('Existing jobs cleared.');

        const csvPath = path.resolve(process.cwd(), '../jobs.csv');
        const jobData: any[] = [];

        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                // title,description,skills,market_demand,date_posted
                const skills = row.skills ? row.skills.split(',').map((s: string) => s.trim().toLowerCase()) : [];
                jobData.push({
                    title: row.title,
                    description: row.description,
                    skills: skills,
                    marketDemand: row.market_demand || 'medium',
                    datePosted: new Date(row.date_posted || Date.now()),
                    company: 'HireForge Partner',
                    location: 'Remote'
                });
            })
            .on('end', async () => {
                if (jobData.length > 0) {
                    await Job.insertMany(jobData);
                    console.log(`${jobData.length} jobs seeded successfully!`);
                } else {
                    console.log('No jobs found in CSV.');
                }
                process.exit(0);
            })
            .on('error', (error) => {
                console.error('Error parsing CSV:', error);
                process.exit(1);
            });
    } catch (error) {
        console.error('Error seeding jobs:', error);
        process.exit(1);
    }
};

seedJobs();
