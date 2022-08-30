// Import All Dependencies
import express from "express";
import "colors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routers
import UserRouter from "./routes/UserRoute.js";

// All Middleware
import handleError from "./middlewares/ErrorHanle.js";

// App init
const app = express();
dotenv.config();

// All Middleware is here
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", true);
app.use(cookieParser());

// All Routes
app.use("/user", UserRouter);

app.use(handleError);
//Export the app for lisening
export default app;
