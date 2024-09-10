import { MongoClient } from 'mongodb';
// import { IUser } from '../models/user';

// const url = 'your_mongodb_connection_string';
// mongodb://localhost:27017
// lub
// mongodb://127.0.0.1:27017
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

// const db = client.db('your_database_name'); Mern_security_tests
const db = client.db('Mern_security_tests');

// const userCollection = db.collection<IUser>('users');

const getCollectionDb = <T extends object>(name: string) => {
  return db && db.collection<T>(name);
};

const getDb = () => {
  return db;
};

export { connectDB, db, getCollectionDb, getDb };
