import { db } from "../../DB/connectionDB.js"
import { ObjectId } from "mongodb";

//? 7. Insert a new log into the logs collection.
export const creatLog = async (req, res, next) => {
    try {
        const { bookId, action } = req.body;
        if (!bookId || !action) {
            return res.status(400).json({ message: "bookId and action are required" });
        }
        const log = {
            bookId: new ObjectId(bookId),
            action
        };

        const result = await db.collection("logs").insertOne(log);

        res.status(201).json({ message: "log added successfully", InsertedId: result.insertedId, acknowledged: result.acknowledged });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}