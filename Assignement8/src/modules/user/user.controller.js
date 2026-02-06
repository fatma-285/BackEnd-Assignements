import { Router } from "express";
import * as US from "./user.service.js";
const userRouter=Router(); 

userRouter.post("/Signup",US.createUser);
userRouter.post("/Login",US.loginUser);
userRouter.patch("/Update/:id",US.updateUser);
userRouter.delete("/Delete/:id",US.deleteUser);
userRouter.get("/Info/:id",US.getUser);

export default userRouter;