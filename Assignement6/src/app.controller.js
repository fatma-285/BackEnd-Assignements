import express from 'express';
import { chechkConnectionDB, checkSyncDB } from './DB/connectionDB.js';
import userRouter from './modules/user/user.controller.js';
import postRouter from './modules/post/post.controller.js';
import commentRouter from './modules/comment/comment.controller.js';

import "./DB/models/Associations.js"

const app = express()
const port = 3000

export const bootstrap=()=>{
    app.use(express.json())
    chechkConnectionDB();
    checkSyncDB();   

    app.get('/', (req, res) =>{
        res.status(200).json({message:'welcome to my blog app'})
    })
    
     app.use("/users",userRouter);
     app.use("/posts",postRouter);
     app.use("/comments",commentRouter);

    app.use("{/*demo}",(req, res) => res.status(404).json({message:`${req.originalUrl} Not Found`}))
    app.listen(port, () => console.log(`listening on port ${port}!`))
}