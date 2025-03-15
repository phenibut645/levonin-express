import mysql from "mysql2/promise";
import config from "../../../config.json" assert {type: "json"};
console.log(config);
const pool = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
export default pool;
