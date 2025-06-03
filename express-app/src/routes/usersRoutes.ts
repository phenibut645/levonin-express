import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import { getUserChannelsController } from "../controllers/users/getUserChannels.controller.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { secretKeyAuthMiddleware } from '../middlewares/secretKeyAuthMiddleware.js';
import { body, validationResult } from 'express-validator';
import { addUser } from '../controllers/users/addUser.controller.js';
import { checkUsername } from '../controllers/users/checkUsername.controller.js';
import { checkToken } from '../controllers/users/checkToken.controller.js';
import { isUserToken } from '../controllers/users/isUserToken.controller.js';
import { getUserId } from '../controllers/users/getUserId.controller.js';


const router = Router();

router.get('/', secretKeyAuthMiddleware, getUsers);
router.get('/check-token/:token', secretKeyAuthMiddleware, checkToken);
router.get('/is-user-token/:userId/:token', isUserToken);
router.get('/channels', authMiddleware, getUserChannelsController);
router.get('/check-username/:username', checkUsername);
router.get('/get-user-id/:username', getUserId)
router.post('/add', addUser);



export default router;