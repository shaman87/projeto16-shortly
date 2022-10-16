import express from "express";
import { createShortUrl, deleteUrl, readOpenUrl, readUrl } from "../controllers/url.controllers.js";
import { checkAuthorization } from "../middlewares/auth.middlewares.js";
import { urlValidation, userUrlValidation } from "../middlewares/url.middlewares.js";

const router = express.Router();

router.post("/urls/shorten", checkAuthorization, urlValidation, createShortUrl);
router.get("/urls/:id", readUrl);
router.get("/urls/open/:shortUrl", readOpenUrl);
router.delete("/urls/:id", checkAuthorization, userUrlValidation, deleteUrl);

export default router;