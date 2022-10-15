import joi from "joi";

const regexUrlPattern = new RegExp('((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)');

const urlSchema = joi.object({
    url: joi.string().pattern(regexUrlPattern).required()
});

export { urlSchema };