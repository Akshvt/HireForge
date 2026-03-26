import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Job from './src/models/Job.js';
import { connectDB } from './src/config/db.js';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

dotenv.config();

async function checkAndSeed() {
  try {
    await connectDB();
    const count = await Job.countDocuments();
    console.log(`Jobs in DB: ${count}`);
    
    if (count === 0) {
      console.log('Seeding jobs from CSV...');
      const csvPath = path.resolve(process.cwd(), '../jobs.csv');
      const jobData: any[] = [];

      await new Promise((resolve, reject) => {
          fs.createReadStream(csvPath)
              .pipe(csv())
              .on('data', (row) => {
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
              .on('end', resolve)
              .on('error', reject);
      });

      if (jobData.length > 0) {
          await Job.insertMany(jobData);
          console.log(`Successfully seeded ${jobData.length} jobs.`);
      } else {
          console.log('CSV is empty or not found.');
      }
    }
  } catch (err) {
    console.error('Diagnostic error:', err);
  } finally {
    mongoose.disconnect();
  }
}

checkAndSeed();
