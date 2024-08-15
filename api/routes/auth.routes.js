import express from "express";
import {
  google,
  signin,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signin);
router.post("/google", google);
router.get("/sign-out", signOut);

export default router;
