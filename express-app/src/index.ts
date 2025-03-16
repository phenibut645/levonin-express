import express from "express";
import pool from "./config/db.js";
import userRoutes from './routes/usersRoutes.js'
import emojiRoutes from './routes/emojiRoutes.js'
import cors from "cors";
import cron from "node-cron";
import { authMiddleware } from "./middlewares/authMiddleware.js";


cron.schedule('*/1 * * * *', async () => {
    const response = await fetch("https://api.opendota.com/api/heroes", {
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Accept-Charset": "utf-8"
        }
    });
    const json = await response.json();
    const randomHero = json[Math.floor(Math.random() * json.length)];
    if(randomHero.localized_name === "Shadow Fiend"){
        console.log(`🌹: 1000-7`);
    }
    else{
        console.log("⚡ Random hero:", randomHero.localized_name);
    }
})

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api/users', authMiddleware, userRoutes)
app.use('/api/emojies', emojiRoutes)

app.listen(PORT, () => {
    console.log("Server running")
})