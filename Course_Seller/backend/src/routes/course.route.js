import express from "express";
import {
  buyCourses,
  courseDetails,
  createCourse,
  deletedCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import userMiddleware from "../middleware/user.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/create", adminMiddleware, createCourse);
router.put("/update/:courseId", adminMiddleware, updateCourse);
router.delete("/delete/:courseId", adminMiddleware, deletedCourse);
router.get("/getcourses", getAllCourses);
router.get("/:courseId", courseDetails);

router.post("/buy/:courseId", userMiddleware, buyCourses);

export default router;
