import express from "express";
import { createShortUrl, readOpenUrl, readUrl } from "../controllers/url.controllers.js";
import { checkAuthorization } from "../middlewares/auth.middlewares.js";
import { urlValidation } from "../middlewares/url.middlewares.js";

const router = express.Router();

router.post("/urls/shorten", checkAuthorization, urlValidation, createShortUrl);
router.get("/urls/:id", readUrl);
router.get("/urls/open/:shortUrl", readOpenUrl);

export default router;