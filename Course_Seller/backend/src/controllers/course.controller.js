import { Course } from "../models/course.models.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";

export const createCourse = async (req, res) => {
  const adminId = req.adminId;
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
      creatorId: adminId,
    };
    const course = await Course.create(coursedata);
    res.json({ message: "Course created successfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating course" });
  }
};

export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, image } = req.body;
  try {
    const course = await Course.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title,
        description,
        price,
        image: {
          public_id: image.public_id,
          url: image.url,
        },
      }
    );
    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    console.log("Error in course updation", error);
  }
};

export const deletedCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      console.log("Course not found");
      return res.status(400).json({ message: "Course not found" });
    } else {
      console.log("Course deleted successfully");
      res.json({ message: "Course deleted successfully", course });
    }
  } catch (error) {
    console.log("Error in course deletion", error);
    res.status(500).json({ message: "Error in course deletion" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    //console.log(courses);
    res.json({ message: "All courses", courses });
  } catch (error) {
    res.status(500).json({ message: "Error in getting all courses" });
    console.log("Error in getting all courses", error);
  }
};

export const courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course not found" });
    } else {
      res.json({ message: "Course details", course });
    }
  } catch (error) {
    console.log("Error in course details", error);
    res.status(500).json({ message: "Error in course details" });
  }
};

export const buyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      res.json({ error: "Course not found" });
    }
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      res.json({ error: "Course already bought" });
    }
    const newPurchase = new Purchase({ userId, courseId });
    await newPurchase.save();
    res
      .status(201)
      .json({ message: "Course purchase successfully", newPurchase });
  } catch (error) {
    console.log("error in course buying", error);
    res.status(400).json({ errors: "error in course buying" });
  }
};
