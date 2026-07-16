import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";

import cors from "cors";
import connectDB from "./utils/connect.js";
import cookieParser from "cookie-parser";
import SuperAdminRoute from "./routes/superAdmin.route.js";


const app = express();
app.use(morgan("dev"));
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://192.168.254.50:5173", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use("/api/auth/superAdmin", SuperAdminRoute);
// app.use("/api/post", postRouter);

connectDB();
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running smoothly on port: ${port}`);
});