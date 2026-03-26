import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './src/models/Job.js';

dotenv.config();

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');
  
  const skills = ['python', 'javascript', 'react', 'sql'];
  const query = { skills: { $in: skills } };
  
  const results = await Job.find(query);
  console.log(`Found ${results.length} jobs for skills: ${skills.join(', ')}`);
  
  if (results.length > 0) {
    console.log('First job:', results[0].title);
  }
  
  await mongoose.disconnect();
}

test();
