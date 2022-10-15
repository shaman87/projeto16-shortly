import express from "express";
import { createShortUrl } from "../controllers/url.controllers.js";
import { checkAuthorization } from "../middlewares/auth.middlewares.js";
import { urlValidation } from "../middlewares/url.middlewares.js";

const router = express.Router();

router.post("/urls/shorten", checkAuthorization, urlValidation, createShortUrl);

export default router;