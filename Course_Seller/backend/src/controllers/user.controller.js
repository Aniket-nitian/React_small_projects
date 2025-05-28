import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existeduser = await User.findOne({ email });
    if (existeduser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    console.log("Error in SignUP", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
