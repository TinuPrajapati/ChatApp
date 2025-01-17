import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.route.js";
import messageRouter from "./src/routes/message.route.js";
import { connectDB } from "./src/lib/db.js";
import cookiesParser from "cookie-parser";
import cors from "cors";
import { app,server,io } from "./src/lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookiesParser());

app.use(cors())

// / Routes for testing is working on deploy
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Login Auth Route
app.use("/api/auth", authRouter);
app.use("/api/messages",messageRouter)

server.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});
