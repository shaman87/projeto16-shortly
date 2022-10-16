import { connection } from "../database/database.js";
import { urlSchema } from "../schemas/url.schema.js";

function urlValidation(req, res, next) {
    const { url } = req.body;
    const validation = urlSchema.validate({ url }, { abortEarly: false});

    if(validation.error) {
        const errorList = validation.error.details.map(error => error.message);
        return res.status(422).send(errorList);
    }

    res.locals.url = url;
    next();
}

async function userUrlValidation(req, res, next) {
    const { user } = res.locals;
    const { id } = req.params;

    try {
        const url = (await connection.query(
            `SELECT * FROM urls WHERE id = $1;`, 
            [id]
        )).rows[0];

        if(!url) return res.sendStatus(404);
        
        if(user.id !== url.userId) return res.sendStatus(401);

        res.locals.urlId = id;
        next();

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { urlValidation, userUrlValidation };