import express from "express";
import  validateBody  from "../helpers/validateBody.js";
import uploadAvatar, { getAvatar } from "../controllers/usersController.js";
import uploadFile from "../helpers/upload.js";
import { repeatVerify, verifyUserByToken } from "../controllers/usersController.js";
import { emailSchema } from "../schemas/userSchema.js";

const userRouter = express.Router();

userRouter.get("/verify/:verificationToken", verifyUserByToken);
userRouter.post("/verify", validateBody(emailSchema), repeatVerify);

userRouter.patch("/avatars", uploadFile.single("avatar"), uploadAvatar);
userRouter.get("/avatars", getAvatar);

export default userRouter;
