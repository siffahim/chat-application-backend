import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 5000),
  host: process.env.HOST ?? "0.0.0.0",
  mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/chat-design",
  jwtSecret: process.env.JWT_SECRET ?? "change-me-in-production",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV ?? "development",
};
