require('dotenv').config();
import { MongoClient } from 'mongodb';

const url = process.env.MONGO_DB_ATLAS_URL!;

const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

const db = client.db('news');

const getCollectionDb = <T extends object>(name: string) => {
  return db && db.collection<T>(name);
};

const getDb = () => {
  return db;
};

export { connectDB, db, getCollectionDb, getDb };
