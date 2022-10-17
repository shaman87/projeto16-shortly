import { connection } from "../database/database.js";

async function readUser(req, res) {
    const { user } = res.locals;

    try {
        const visitCount = (await connection.query(
            `SELECT SUM("visitCount") FROM urls WHERE "userId" = $1;`, 
            [user.id])).rows[0].sum;
        
        const shortenedUrls = (await connection.query(
            `SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1;`, 
            [user.id])).rows;
        
        return res.status(200).send({
            id: user.id, 
            name: user.name, 
            visitCount, 
            shortenedUrls
        });

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { readUser };