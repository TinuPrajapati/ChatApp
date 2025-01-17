import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSiderbar, sendMessage } from "../controller/message.controller.js";
import { upload } from "../lib/cloudinary.js";
const router = express.Router();

router.get("/users",protectedRoute,getUsersForSiderbar);
router.get("/:id",protectedRoute,getMessages)

router.post("/send/:id",protectedRoute,upload.single("image"),sendMessage)

export default router;