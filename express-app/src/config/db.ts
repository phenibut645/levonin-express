import mysql from "mysql2/promise";
import { database, host, password, user } from "./configData.js";

const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
export default pool;
