import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, '../../../config.json');

const config = JSON.parse(await readFile(configPath, 'utf-8'));

export const database = config.DATABASE;
export const password = config.PASSWORD;
export const emojiesPath = config.EMOJIES_PATH;
export const user = config.USER;
export const host = config.HOST;
export const token_expiration_time = config.TOKEN_EXPIRATION_TIME;
export const secretApiKey = config.SECRET_API_KEY;
export const defaultUserRoleId = config.DEFAULT_USER_ROLE_ID;
export const defaultUserStatusId = config.DEFAULT_USER_STATUS_ID;
