import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let cached = (global as any).mongooseConn;
if (!cached) {
  cached = (global as any).mongooseConn = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!process.env['MONGODB_URI']) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env['MONGODB_URI'], {}).then((m) => {
      console.log(`MongoDB Connected: ${m.connection.host}`);
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`MongoDB connection error: ${(error as Error).message}`);
    throw error;
  }

  return cached.conn;
};
