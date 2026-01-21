import { Router } from "express";
import * as PS from "./post.service.js"
const postRouter=Router();

postRouter.post("/create-post",PS.createPost)

postRouter.delete("/delete-post/:id",PS.deletePost)

postRouter.get("/",PS.getAllPosts)

postRouter.get("/comment-count",PS.getPostsWithCommentCount)

export default postRouter