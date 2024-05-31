import express from "express";
import uploadAvatar, { getAvatar } from "../controllers/usersController.js";
import uploadFile from "../helpers/upload.js";

const avatarRouter = express.Router();

avatarRouter.patch("/avatars", uploadFile.single("avatarURL"), uploadAvatar);
avatarRouter.get("/avatars", getAvatar);
export default avatarRouter;
