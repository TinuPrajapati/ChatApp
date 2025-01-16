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

// signup routes
router.post("/signup", signup);

// login routes
router.post("/login", login);

// logout routes
router.post("/logout", logout);

router.put("/update-profile", protectedRoute, updateProfile);

router.get("/check", protectedRoute, checkAuth);

export default router;
