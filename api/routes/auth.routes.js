import express from "express";
import { google, signin, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signin);
router.post("/google", google);

export default router;
