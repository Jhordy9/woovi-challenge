import { MongoClient, Db } from 'mongodb';
import mongoose from 'mongoose';

const dbUrl =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/woovi-challenge';

export function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', (error) => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(dbUrl);
  });
}
