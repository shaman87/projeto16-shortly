import { nanoid } from "nanoid";
import { connection } from "../database/database.js";

async function createShortUrl(req, res) {
    const { user } = res.locals;
    const { url } = res.locals;
    const shortUrl = nanoid(8);

    try {
        await connection.query(
            `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3);`, 
            [url, shortUrl, user.id]
        );

        return res.status(201).send({ shortUrl });

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { createShortUrl };