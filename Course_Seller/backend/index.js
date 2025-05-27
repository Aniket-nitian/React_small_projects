import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import courseRoute from "./src/routes/course.route.js";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
dotenv.config({
  path: "./.env",
});
const app = express();

//!middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//! MongoDb connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//! Defining routes
app.use("/api/v1/course", courseRoute);
