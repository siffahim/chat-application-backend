import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.get("/:id", UserController.getSingleUser);
router
  .route("/")
  .post(UserController.createUser)
  .get(UserController.getAllUsers);

export const UserRoutes = router;
