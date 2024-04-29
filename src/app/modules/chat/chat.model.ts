import { model, Schema } from "mongoose";
import { IChat } from "./chat.interface";

const chatSchema = new Schema<IChat>(
  {
    members: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const Chat = model<IChat>("Chat", chatSchema);
