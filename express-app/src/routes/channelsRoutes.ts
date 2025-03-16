import { Router } from "express";
import { channelAuth } from "../middlewares/channelAuth.middleware.js";
import { getMessagesController } from "../controllers/messages/getMessages.controller.js";
import { getChannelsController } from "../controllers/messages/getChannels.controller.js";

const router = Router();

router.get('/:channel_id/messages', channelAuth, getMessagesController);
router.get('/', getChannelsController);

export default router;