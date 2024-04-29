import { Request, Response } from "express";
import { Chat } from "./chat.model";

const createChat = async (req: Request, res: Response) => {
  try {
    const payload = { members: [req.body.senderId, req.body.receiverId] };
    const result = await Chat.create(payload);

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};

const userChats = async (req: Request, res: Response) => {
  try {
    const chat = await Chat.find({ members: { $in: [req.params.userId] } });

    res.status(200).json(chat);
  } catch (error) {
    res.status(200).json(error);
  }
};

const findChat = async (req: Request, res: Response) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(200).json(error);
  }
};

export const ChatController = {
  createChat,
  userChats,
  findChat,
};
