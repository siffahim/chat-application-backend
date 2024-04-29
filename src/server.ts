import mongoose from "mongoose";
import app from "./app";

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chat-design");
    console.log("Successfully Connected to Database");

    app.listen(5000, () => {
      console.log("Application listen on port:5000");
    });
  } catch (error) {
    console.log("Failed to connect Database", error);
  }
}

main();
