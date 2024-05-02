import { Request, Response } from "express";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  try {
    const result = await User.create(userData);

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.find().sort({ createdAt: -1 });

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await User.findById(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const result = await User.findOne({ email: email });

    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};

export const UserController = {
  createUser,
  getSingleUser,
  getAllUsers,
  loginUser,
};
