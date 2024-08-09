import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
dotenv.config();
const app = express();
app.use("/api/user", userRouter);
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
