import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connect } from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://192.168.254.50:5173", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

connect();
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running smoothly on port: ${port}`);
});