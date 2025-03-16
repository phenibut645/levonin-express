import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import { getUserChannelsController } from "../controllers/users/getUserChannels.controller.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { secretKeyAuthMiddleware } from '../middlewares/secretKeyAuthMiddleware.js';


const router = Router();

router.get('/', secretKeyAuthMiddleware, getUsers);
router.get('/channels', authMiddleware, getUserChannelsController)

export default router;