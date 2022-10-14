import express from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { signInValidation, signUpValidation } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", signUpValidation, signUp);
router.post("/signin", signInValidation, signIn);

export default router;