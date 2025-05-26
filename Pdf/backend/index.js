import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import docxConverter from "docx-pdf";
import path from "path";

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/convertfile", upload.single("file"), function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json("No file uploaded");
    }
    //? defining output file path
    let outputpath = path.join(
      "uploads",
      "files",
      `${req.file.originalname}.pdf`
    );

    docxConverter(req.file.path, outputpath, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Error converting file");
      }
      res.download(outputpath, () => {
        console.log("downloaded");
      });
      console.log("result" + result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

dotenv.config({
  path: "./.env",
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running at port ${process.env.PORT || 5000}`);
});
