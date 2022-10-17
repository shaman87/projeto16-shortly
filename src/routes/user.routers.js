import express from "express";
import { readUser } from "../controllers/users.controllers.js";
import { checkAuthorization } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/users/me", checkAuthorization, readUser);

export default router;