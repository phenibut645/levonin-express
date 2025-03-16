import { Router } from "express";
import { channelAuth } from "../middlewares/channelAuth.middleware.js";
import { getMessagesController } from "../controllers/channels/getMessages.controller.js";
import { secretKeyAuthMiddleware } from "../middlewares/secretKeyAuthMiddleware.js";
import { getChannelsController } from "../controllers/channels/getChannels.controller.js";

const router = Router();

router.get('/:channel_id/messages', channelAuth, getMessagesController);
router.get('/', secretKeyAuthMiddleware, getChannelsController)

export default router;