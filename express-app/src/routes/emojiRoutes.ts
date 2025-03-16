import { Router } from "express";
import { getEmojiLinkController } from "../controllers/emojies/getEmojiLinkContoller.js";
import { checkEmojiController } from "../controllers/emojies/checkEmojiController.js";

const router = Router();
router.get('/get-link', getEmojiLinkController);
router.get('/check-emoji', checkEmojiController);

export default router;