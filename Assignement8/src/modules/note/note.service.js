import { Note, User } from "../../DB/models/index.js";

// ?1. Create a Single Note (Get the id for the logged-in user (userId) from the token not the body) (send the tokenintheheaders)

export const createNote=async(req,res,next)=>{
    try {
        const {title,content,userId }=req.body;
        if(await User.findOne({userId})){
            return res.status(400).json({message:`user with id ${userId} not found`});
        }
        const note= new Note({title,content,userId});
        await note.save();
        res.status(201).json({message:"note created successfully",note});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//? 2. Update a single Note by its id and return the updated note. (Only the owner of the note can make this operation)
//? (Get the id for the logged-in user (userId) from the token not the body)

export const updateNote=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const {userId}=req.query;
        const {title,content}=req.body;
        const note=await Note.findById(id);
        if(!note){
            return res.status(400).json({message:`note with id ${id} not found`});
        }
        if(note.userId.toString()!==userId.toString()){
            return res.status(400).json({message:"you are not the owner of this note"});
        }
        note.title=title?title:note.title;
        note.content=content?content:note.content;
        await note.save();
        res.status(200).json({message:`note with id ${id} updated successfully`,note});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//?3. Replace the entire note document with the new data provided in the request body. (Only the owner of the notecanmake this operation)

export const replaceNote=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const {title,content,userId}=req.body;
        const note=await Note.findById(id);
        if(!note){
            return res.status(400).json({message:`note with id ${id} not found`});
        }
        if(note.userId.toString()!==userId.toString()){
            return res.status(400).json({message:"you are not the owner of this note"});
        }
        note.title=title?title:note.title;
        note.content=content?content:note.content;
        await note.save();
        res.status(200).json({message:`note with id ${id} replaced successfully`,note});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//? 4. Updates the title of all notes created by a logged-in user.) (Get the new Title from the body) (Get the id for the
//? logged-in user (userId) from the token not the body)

export const updateAllNotes=async(req,res,next)=>{
    try {
        const {userId,title}=req.body;
        // if(await User.findOne({userId})){
        //     return res.status(400).json({message:`user with id ${userId} not found`});
        // }
        if(!title){
            return res.status(400).json({message:"title is required"});
        }
        const notes=await Note.updateMany({userId},{title});
        if(notes.modifiedCount===0){
            return res.status(400).json({message:"no notes found"});
        }
        res.status(200).json({message:`${notes.modifiedCount} notes updated successfully`,notes});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//? 5. Delete a single Note by its id and return the deleted note. (Only the owner of the note can make this operation)
//? (Get the id for the logged-in user from the token not the body)

export const deleteNote=async(req,res,next)=>{
  try {
    const {id}=req.params;
    const{userId}=req.body;
    const note=await Note.findByIdAndDelete(id);
    if(!note){
        return res.status(400).json({message:`note with id ${id} not found`});
    }
    if(note.userId.toString()!==userId.toString()){
        return res.status(400).json({message:"you are not the owner of this note"});
    }
    res.status(200).json({message:`note with id ${id} deleted successfully`,note});
  } catch (error) {
    res.status(500).json({message:"something went wrong",error:error.message});
  }
}

//? 6- Retrieve a paginated list of notes for the logged-in user, sorted by “createdAt”in descending order. (Get page andlimit from query parameters)

export const getPaginatedNotes=async(req,res,next)=>{
    try {
        const {page,limit}=req.query;
        const {userId}=req.body;
        const notes=await Note.find({userId}).sort({ctreaedAt:-1}).skip((page-1)*limit).limit(limit);
        if(notes.length===0){
            return res.status(400).json({message:"no notes found"});
        }
        res.status(200).json({message:`notes fetched successfully`,count:notes.length,notes});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//? 7. Get a note by its id. (Only the owner of the note can make this operation) 

export const getNote=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const {userId}=req.body;
        // if(await User.findOne({userId})){
        //     return res.status(400).json({message:`user with id ${userId} not found`});
        // }
        const note=await Note.findById(id);
        if(!note){
            return res.status(400).json({message:`note with id ${id} not found`});
        }
        if(note.userId.toString()!==userId.toString()){
            return res.status(400).json({message:"you are not the owner of this note"});
        }
        res.status(200).json({message:`note with id ${id} fetched successfully`,note});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//? 8. Get a note for logged-in user by its content. 

export const getNoteByContent=async(req,res,next)=>{
    try {
        const {content}=req.query;
        const {userId}=req.body;
        if (!content) {
      return res.status(400).json({ message: "content is required" });
    }
        const matchedNotes=await Note.find({content,userId});
        if(matchedNotes.length===0){
            return res.status(400).json({message:`no note with content ${content} found`});
        }
        res.status(200).json({message:`${matchedNotes.length} notes found with content ${content}`,matchedNotes});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error});
    }
}

//? 9. Retrieves all notes for the logged-in user with user information, selecting only the “title, userId and createdAt”
//? from the note and the “email” from the user. 

export const getAllNotes=async(req,res,next)=>{
    try {
        const {userId}=req.body;
        const notes=await Note.find({userId}).select("title userId createdAt").populate("userId","email");
        if(notes.length===0){
            return res.status(400).json({message:"no notes found"});
        }
        res.status(200).json({message:`notes fetched successfully`,count:notes.length,notes});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//? 10. Using aggregation, retrieves all notes for the logged-in user with user information (name and email) and allowsearching notes by the title. 

export const searchByTitle=async(req,res,next)=>{
    try {
        const{title}=req.query;
        const {userId}=req.body;
        if (!title) {
            return res.status(400).json({ message: "title is required" });
        }
        const notes=await Note.find({title,userId}).select("title userId createdAt").populate("userId","name email");
        if(notes.length===0){
            return res.status(400).json({message:"no notes found"});
        }
        res.status(200).json({message:`notes fetched successfully`,count:notes.length,notes});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//?11. Delete all notes for the logged-in user.

export const deleteAllNotes=async(req,res,next)=>{
    try {
        const {userId}=req.body;
        const notes=await Note.deleteMany({userId});
        if(notes.deletedCount===0){
            return res.status(400).json({message:"no notes found"});
        }
        res.status(200).json({message:`${notes.deletedCount} notes deleted successfully`});  
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}