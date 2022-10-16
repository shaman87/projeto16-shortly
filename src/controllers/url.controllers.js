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

async function readUrl(req, res) {
    const { id } = req.params;

    try {
        const url = (await connection.query(
            `SELECT id, "shortUrl", url FROM urls WHERE id = $1;`,
            [id]
        )).rows[0];
            
        if(!url) return res.sendStatus(404);

        return res.status(200).send({ url });

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function readOpenUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const url = (await connection.query(
            `SELECT * FROM urls WHERE "shortUrl" = $1;`, 
            [shortUrl])
        ).rows[0];

    if(!url) return res.sendStatus(404);

    await connection.query(
        `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1;`, 
        [url.id]
    );

    return res.redirect(url.url);

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function deleteUrl(req, res) {
    const { urlId } = res.locals;

    try {
        await connection.query(`DELETE FROM urls WHERE id = $1;`, [urlId]);

        res.sendStatus(204);

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { createShortUrl, readUrl, readOpenUrl, deleteUrl };