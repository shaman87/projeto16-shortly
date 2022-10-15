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

export { urlValidation };