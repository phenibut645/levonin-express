import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import { getUserChannelsController } from "../controllers/users/getUserChannels.controller.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { secretKeyAuthMiddleware } from '../middlewares/secretKeyAuthMiddleware.js';
import { body, validationResult } from 'express-validator';
import { addUser } from '../controllers/users/addUser.controller.js';
import { checkUsername } from '../controllers/users/checkUsername.controller.js';


const router = Router();

router.get('/', secretKeyAuthMiddleware, getUsers);
router.get('/channels', authMiddleware, getUserChannelsController);
router.get('/check-username/:username', checkUsername)
router.post('/add', addUser)

export default router;