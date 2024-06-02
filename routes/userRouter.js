import express from "express";
import  validateBody  from "../helpers/validateBody.js";
import {register, login, logout, userByToken} from "../controllers/authController.js";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchema.js";
import middlewareAuth from "../helpers/middlewareAuth.js";

const userRouter = express.Router();

const jsonParser = express.json();

userRouter.post("/register", validateBody(registerUserSchema), jsonParser, register);
userRouter.post("/login", validateBody(loginUserSchema), jsonParser, login);
userRouter.post("/logout", middlewareAuth, logout);
userRouter.get("/current", middlewareAuth, userByToken);

export default userRouter;