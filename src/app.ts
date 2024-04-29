import express, { Request, Response } from "express";
import router from "./routes";
const app = express();

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Chat Server");
});

export default app;
