import { Course } from "../models/course.models.js";
import { v2 as cloudinary } from "cloudinary";

export const createCourse = async (req, res) => {
  const { title, description, price } = req.body;
  const { image } = req.files;
  console.log(title, description, price, image);

  try {
    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Image is required" });
    }
    const allowedFormate = ["image/png", "image/jpeg"];
    if (!allowedFormate.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ message: "Only png and jpg format is allowed" });
    }
    //Cloudinary
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

    if (!cloud_response) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const coursedata = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
    };
    const course = await Course.create(coursedata);
    res.json({ message: "Course created successfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating course" });
  }
};
