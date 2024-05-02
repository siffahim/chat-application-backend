import express from "express";
import { ChatRoutes } from "../app/modules/chat/chat.route";
import { MessageRoutes } from "../app/modules/message/message.route";
import { UserRoutes } from "../app/modules/user/user.route";
const router = express.Router();

router.use("/user", UserRoutes);
router.use("/chat", ChatRoutes);
router.use("/message", MessageRoutes);

export default router;
