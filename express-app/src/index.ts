import express, { Request, Response } from "express";
import pool from "./config/db.js";
import userRoutes from './routes/usersRoutes.js'
import cors from "cors";
import cron from "node-cron";


cron.schedule('*/10 * * * *', async () => {
    console.log("Tokens have cleared");
    await pool.query("DELETE FROM tokens");
})

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes)

app.listen(PORT, () => {
    console.log("Server running")
})