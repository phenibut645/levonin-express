import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import { getUserChannelsController } from "../controllers/users/getUserChannels.controller.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { secretKeyAuthMiddleware } from '../middlewares/secretKeyAuthMiddleware.js';
import { body, validationResult } from 'express-validator';
import { addUser } from '../controllers/users/addUser.controller.js';
import { checkUsername } from '../controllers/users/checkUsername.controller.js';
<<<<<<< HEAD
import { searchUsers } from '../controllers/users/getUsers.controller.js';
=======
import { checkToken } from '../controllers/users/checkToken.controller.js';
import { isUserToken } from '../controllers/users/isUserToken.controller.js';
import { getUserId } from '../controllers/users/getUserId.controller.js';
>>>>>>> 2f7f8f9c26ba835b1a25ebc8eacbc0d9d9625c20


const router = Router();

router.get('/', secretKeyAuthMiddleware, getUsers);
<<<<<<< HEAD
router.get('/:username', searchUsers);
=======
router.get('/check-token/:token', secretKeyAuthMiddleware, checkToken);
router.get('/is-user-token/:userId/:token', isUserToken);
>>>>>>> 2f7f8f9c26ba835b1a25ebc8eacbc0d9d9625c20
router.get('/channels', authMiddleware, getUserChannelsController);
router.get('/check-username/:username', checkUsername);
router.get('/get-user-id/:username', getUserId)
router.post('/add', addUser);



export default router;