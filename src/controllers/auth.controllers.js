import { connection } from "../database/database.js";
import { v4 as uuid } from "uuid";
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

async function signIn(req, res) {
    const userId = res.locals;
    const token = uuid();

    try {
        await connection.query(`DELETE FROM sessions WHERE "userId" = $1;`, [userId]);

        await connection.query(
            `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, 
            [userId, token]
        );

        return res.status(200).send({ token });

    } catch(error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { signUp, signIn };