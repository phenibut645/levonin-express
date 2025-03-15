import express, { Request, Response } from "express";
import pool from "./config/db.js";
import userRoutes from './routes/usersRoutes.js'

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api', userRoutes)

app.listen(PORT, () => {
    console.log("Server running")
})