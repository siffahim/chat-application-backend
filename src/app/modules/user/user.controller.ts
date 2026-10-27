import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { config } from "../../../config/env";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required." });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ message: "A valid email is required." });
  }

  if (String(password).length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  try {
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const result = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: String(password),
    });

    return res.status(201).json({
      id: result._id,
      name: result.name,
      email: result.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create user." });
  }
};

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const result = await User.find().sort({ createdAt: -1 }).select("-password");

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch users." });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await User.findById(req.params.id).select("-password");

    if (!result) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch user." });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(String(password), user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to login." });
  }
};

export const UserController = {
  createUser,
  getSingleUser,
  getAllUsers,
  loginUser,
};
