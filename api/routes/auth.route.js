import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express();

router.get("/sign-up", signup);
export default router;
