import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import { config } from "./config/env";
import { SocketHelper } from "./helpers/socketHelper";

async function main() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Successfully connected to database");

    const server = createServer(app);
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: config.corsOrigin
          .split(",")
          .map((origin) => origin.trim())
          .filter(Boolean),
        credentials: true,
        methods: ["GET", "POST"],
      },
    });

    SocketHelper.socket(io);

    server.listen(config.port, config.host, () => {
      console.log(`Application listening on port:${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
}

main();
