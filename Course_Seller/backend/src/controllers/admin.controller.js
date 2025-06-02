import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";

import { Admin } from "../models/admin.model.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //! validation using zod
    const adminSchema = z.object({
      firstName: z
        .string()
        .min(6, { message: "firstName must be atleast 6" })
        .max(50),
      lastName: z
        .string()
        .min(3, { message: "lastName must be atleast 3" })
        .max(10),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "password must be atleast 6" })
        .max(15),
    });
    const validatedData = adminSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ errors: validatedData.error.issues.map((err) => err.message) });
    }

    //! password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const existedadmin = await Admin.findOne({ email });
    if (existedadmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      newAdmin,
    });
  } catch (error) {
    console.log("Error in SignUP", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email });
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!admin || !isPasswordCorrect) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }
    //! JWT code
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_ADMIN_PASSWORD,
      {
        expiresIn: "1d",
      }
    );
    const cookiesOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //? true for https only
      sameSite: "Strict",
    };
    res.cookie("jwt", token, cookiesOptions);
    res.status(201).json({ message: "Login Successfully", admin, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server error in login" });
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      res.status(400).json({ message: "Login First" });
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in logout" });
  }
};
