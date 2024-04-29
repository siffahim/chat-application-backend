import express from "express";
import { ChatRoutes } from "../app/modules/chat/chat.route";
const router = express.Router();

router.use("/chat", ChatRoutes);

export default router;
