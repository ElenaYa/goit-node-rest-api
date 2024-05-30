import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import middlewareAuth from "./helpers/middlewareAuth.js";

import contactsRouter from "./routes/contactsRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

const DB_HOST = process.env.DB_HOST;

async function run() {
    mongoose.connect(DB_HOST, { autoIndex: false })
    .then(() => console.log("Database connection successful"))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
run();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", middlewareAuth, contactsRouter);
app.use("/users", userRouter);

app.use((_, res) => {
    res.status(404).json({message: "Route not found"});
});

app.use((err, req, res, next) => {
    const {status = 500, message = "Server error"} = err;
    res.status(status).json({message});
});

app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
});
