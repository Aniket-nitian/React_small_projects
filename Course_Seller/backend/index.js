import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import courseRoute from "./src/routes/course.route.js";
dotenv.config({
  path: "./.env",
});
const app = express();

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
