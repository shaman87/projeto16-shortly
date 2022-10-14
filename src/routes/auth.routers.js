import express from "express";
import { signUp } from "../controllers/auth.controllers.js";
import { signUpValidation } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", signUpValidation, signUp);

export default router;