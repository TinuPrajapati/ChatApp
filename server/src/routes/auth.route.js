import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
import {upload} from "../lib/cloudinary.js"

// signup routes
router.post("/signup", signup);

// login routes
router.post("/login", login);

// logout routes
router.post("/logout", logout);

router.put("/update-profile", protectedRoute,upload.single("image"), updateProfile);

router.get("/check", protectedRoute, checkAuth);

export default router;
