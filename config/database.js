import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let database;
try {
  database = await client.connect();
} catch(e) {
  console.error(e);
}
let db = database.db(process.env.DATABASE);
export default db;