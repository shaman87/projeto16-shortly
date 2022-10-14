import { connection } from "../database/database.js";
import { signUpSchema } from "../schemas/auth.schemas.js";

async function signUpValidation(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const validation = signUpSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false });

    if(validation.error) {
        const errorList = validation.error.details.map(error => error.message);
        return res.status(422).send(errorList);
    }

    try {
        const checkUserEmail = (await connection.query(`SELECT * FROM users WHERE email = $1;`, [email])).rows[0];

        if(checkUserEmail) {
            return res.sendStatus(409);
        }
    
        res.locals.body = { name, email, password };
        next();

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function checkAuthorization(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    try {
        const session = (await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token])).rows[0];
        if(!session) return res.sendStatus(401);

        const user = (await connection.query(`SELECT * FROM users WHERE id = $1;`, [session.userId])).rows[0];
        if(!user) return res.sendStatus(404);

        delete user.password;
        res.locals.user = user;
        next();

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { signUpValidation, checkAuthorization };