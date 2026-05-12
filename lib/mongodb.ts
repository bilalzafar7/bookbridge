import { type Db, MongoClient } from "mongodb";

const rawUri = process.env.MONGODB_URI;
if (!rawUri) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}
/** Resolved Mongo connection string (narrowed for nested closures). */
const uri: string = rawUri;

const dbName = process.env.MONGODB_DB ?? "bookbridge";

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!globalForMongo._mongoClientPromise) {
      const client = new MongoClient(uri);
      globalForMongo._mongoClientPromise = client.connect();
    }
    return globalForMongo._mongoClientPromise;
  }
  const client = new MongoClient(uri);
  return client.connect();
}

const clientPromise = getClientPromise();

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
