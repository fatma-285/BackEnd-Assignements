import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

export const db = client.db('library');

export const checkConnectionDb = async () => {
    try {
        await client.connect();
        console.log(`connected successfully to DB`);
    } catch (error) {
        console.log(`failed to connect to DB`, error);
    }
}