import express from "express";
import userRoutes from './routes/usersRoutes.js'
import emojiRoutes from './routes/emojiRoutes.js'
import cors from "cors";
import cron from "node-cron";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import channelsRoutes from "./routes/channelsRoutes.js";
import { authorizeController } from "./controllers/authorizzeController.js";
import { Request, Response } from "express";
import { secretKeyAuthMiddleware } from "./middlewares/secretKeyAuthMiddleware.js";
import { getUsersInChannel } from "./controllers/channels/getUsersInChannel.controller.js";

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

app.use('/api/users', userRoutes);
app.use('/api/emojies', emojiRoutes);
app.get('/api/channels/:channel_id', secretKeyAuthMiddleware, getUsersInChannel)
app.use('/api/channels', authMiddleware, channelsRoutes);

app.post('/api/authorize', authorizeController)
app.get('/', (req: Request, res:Response) => {
    res.send("working");
});

app.listen(PORT, "localhost", () => {
    console.log("Server running");
})