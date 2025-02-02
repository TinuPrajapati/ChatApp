import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookiesParser from "cookie-parser";
import cors from "cors";
import { app,server,io } from "./lib/socket.js";
import path from "path"

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookiesParser());

app.use(cors({
  origin:process.env.FRONTEND,
  credentials:true
}))

// / Routes for testing is working on deploy
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Login Auth Route
app.use("/api/auth", authRouter);
app.use("/api/messages",messageRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../client/dist")));
  
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client","dist","index.html"))
  })
}

server.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});
