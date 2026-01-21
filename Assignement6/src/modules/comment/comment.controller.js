import { Router } from "express";
import * as CS from "./comment.service.js"

const commentRouter=Router();

commentRouter.post("/create-comments",CS.createComment)

commentRouter.patch("/update-comment/:id",CS.updateComment)

commentRouter.post("/find-or-create-comment",CS.findOrCreateComment)

commentRouter.get("/search",CS.searchComment)

commentRouter.get("/newest/:id",CS.getNewestComments)

commentRouter.get("/comment-details/:id",CS.getCommentById)

export default commentRouter