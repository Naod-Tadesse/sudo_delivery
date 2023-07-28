const multer = require("multer");
const path = require("path");

//setup disk storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./storage/" + req.params.type);
//   },
//   filename: (req, file, cb) => {
//     let parsedFileName = path.parse(file.originalname).name;
//     parsedFileName = parsedFileName.split(" ").join("_");
//     let filename =
//       Date.now() + "--" + parsedFileName + path.extname(file.originalname);
//     cb(null, filename);
//   },
// });

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
        let parsedFileName = path.parse(file.originalname).name;
        parsedFileName = parsedFileName.split(" ").join("_");
        let filename =
          Date.now() + "--" + parsedFileName + path.extname(file.originalname);
        cb(null, filename);
      }
})
//filter files to upload
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("only image files supported"));
  }
};

// set up the functionality
const upload = multer({
  storage: storage,
  fileFiler: fileFilter,
});

exports.upload = upload;
