import mongoose from "mongoose";


function validateTitle(title) {
    return title === title.toLowerCase();
}

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: [validateTitle, "Title must be lowercase"]
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    });

export const Note =mongoose.models.Note || mongoose.model("Note", noteSchema);