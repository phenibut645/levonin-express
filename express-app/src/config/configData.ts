import config from "../../../config.json";
console.log(config);

export const database = config.DATABASE;
export const password = config.PASSWORD;
export const emojiesPath = config.EMOJIES_PATH;
export const user = config.USER;
export const host = config.HOST;
export const token_expiration_time = config.TOKEN_EXPIRATION_TIME;
export const secretApiKey = config.SECRET_API_KEY;