import express from "express";
import  validateBody  from "../helpers/validateBody.js";
import {register, login, logout, userByToken} from "../controllers/authController.js";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchema.js";
import middlewareAuth from "../helpers/middlewareAuth.js";

const authRouter = express.Router();

const jsonParser = express.json();

authRouter.post("/register", validateBody(registerUserSchema), jsonParser, register);
authRouter.post("/login", validateBody(loginUserSchema), jsonParser, login);
authRouter.post("/logout", middlewareAuth, logout);
authRouter.get("/current", middlewareAuth, userByToken);

export default authRouter;