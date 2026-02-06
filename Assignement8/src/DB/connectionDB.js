import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose
        .connect("mongodb://localhost:27017/myStickyNotesApp")
        .then(() => console.log("DB connected successfully....✌"))
        .catch((err) => console.log(err));
}
