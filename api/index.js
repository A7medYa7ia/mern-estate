import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.routes.js";
import path from "path";
dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
const db = mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connect to db successfully"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("hello, world");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
