import { config } from './config';
import { logger } from '../helpers';
import { MongoClient } from 'mongodb';

const url = config.mongo_db_atlas_url!;

export const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
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
