import express from "express";
import {
  courseDetails,
  createCourse,
  deletedCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deletedCourse);
router.get("/getcourses", getAllCourses);
router.get("/:courseId", courseDetails);

export default router;
