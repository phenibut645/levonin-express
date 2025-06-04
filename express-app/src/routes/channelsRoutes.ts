import { Router } from "express";
import { channelAuth } from "../middlewares/channelAuth.middleware.js";
import { getMessagesController } from "../controllers/channels/getMessages.controller.js";
import { secretKeyAuthMiddleware } from "../middlewares/secretKeyAuthMiddleware.js";
import { getChannelsController } from "../controllers/channels/getChannels.controller.js";
import getUsers from "../controllers/channels/getUsers.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
<<<<<<< HEAD
import { addChannel } from "../controllers/channels/addChannel.controller.js";
=======
import { getUsersInChannel } from "../controllers/channels/getUsersInChannel.controller.js";
import { sendMessage } from "../controllers/channels/sendMessage.controller.js";
>>>>>>> 2f7f8f9c26ba835b1a25ebc8eacbc0d9d9625c20

const router = Router();

router.get('/:channel_id/messages', channelAuth, getMessagesController);
router.post('/send-message', sendMessage)
router.get('/', secretKeyAuthMiddleware, getChannelsController);
<<<<<<< HEAD
router.get('/users', authMiddleware, getUsers)
router.post('/add', addChannel)
=======
router.get('/users', getUsers)


>>>>>>> 2f7f8f9c26ba835b1a25ebc8eacbc0d9d9625c20

export default router;