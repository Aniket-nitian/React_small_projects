import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.models.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //! validation using zod
    const userSchema = z.object({
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
    const validatedData = userSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ errors: validatedData.error.issues.map((err) => err.message) });
    }

    //! password hashing
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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }
    //! JWT code
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_USER_PASSWORD,
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
    res.status(201).json({ message: "Login Successfully", user, token });
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

export const purchases = async (req, res) => {
  const userId = req.userId;
  try {
    const purchases = await Purchase.find({ userId });
    let purchasedCourseId = [];
    for (let i = 0; i < purchases.length; i++) {
      purchasedCourseId.push(purchases[i].courseId);
    }
    const courseData = await Course.find({
      _id: { $in: purchasedCourseId },
    });
    res
      .status(400)
      .json({ message: "All purchased course", purchases, courseData });
  } catch (error) {
    res.json({ errors: "purchased coursed failed" });
  }
};
