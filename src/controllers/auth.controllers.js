import { connection } from "../database/database.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {
    const { name, email, password } = res.locals.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    try {
        await connection.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, 
            [name, email, hashPassword]
        );

        res.sendStatus(201);

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { signUp };