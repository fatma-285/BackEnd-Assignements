import express from "express"
import { connectDB } from "./DB/connectionDB.js";
import userRouter from "./modules/user/user.controller.js";
import noteRouter from "./modules/note/note.controller.js";

export const bootstrap=()=>{

    const app=express();
    connectDB();

    app.use(express.json())
    
    app.get("/",(req,res)=>{
        res.status(200).json({message:"Welcomr to My Sticky Notes APP"})
    })

    app.use("/user",userRouter);
    app.use("/note",noteRouter);

    app.use("{/*demo}",(req,res,next)=>{
        res.status(404).json({message:`url ${req.originalUrl} not found 👀`})
    })

    app.listen(3000,()=>{
        console.log("server is running on port 3000 😎")
    })
}