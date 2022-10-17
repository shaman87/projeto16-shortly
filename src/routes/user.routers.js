import express from "express";
import { readRanking, readUser } from "../controllers/users.controllers.js";
import { checkAuthorization } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/users/me", checkAuthorization, readUser);
router.get("/ranking", readRanking);

export default router;