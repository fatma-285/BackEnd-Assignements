import { Router } from "express";
import * as US from "./user.service.js"

const userRouter=Router();

userRouter.post("/signUp",US.signUp);

userRouter.put("/create-updateUser/:id",US.createOrUpdateUser);

userRouter.get("/findByEmail",US.findByEmail)

userRouter.get("/findById/:id",US.getUserById)

export default userRouter