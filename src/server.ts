import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app";
import { SocketHelper } from "./helpers/socketHelper";

let server;
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chat-design");
    console.log("Successfully Connected to Database");

    server = app.listen(5000, "192.168.1.9", () => {
      console.log("Application listen on port:5000");
    });

    //socket handle here
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
      },
    });
    SocketHelper.socket(io);
  } catch (error) {
    console.log("Failed to connect Database", error);
  }
}

main();
