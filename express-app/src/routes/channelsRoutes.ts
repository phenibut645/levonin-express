import { Router } from "express";
import { channelAuth } from "../middlewares/channelAuth.middleware.js";
import { getMessagesController } from "../controllers/channels/getMessages.controller.js";
import { secretKeyAuthMiddleware } from "../middlewares/secretKeyAuthMiddleware.js";
import { getChannelsController } from "../controllers/channels/getChannels.controller.js";
import getUsers from "../controllers/channels/getUsers.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/:channel_id/messages', channelAuth, getMessagesController);
router.get('/', secretKeyAuthMiddleware, getChannelsController);
router.get('/users', authMiddleware, getUsers)

export default router;