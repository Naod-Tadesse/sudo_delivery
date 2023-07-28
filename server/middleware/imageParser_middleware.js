const { uploader } = require("../utilities/cloudinaryConfig");

const parse = async (req, res, next) => {
  //this function sets the req.file or req.files properties set by the multer to req.body
  if (req.file) {
    try {
      const result = await uploader.upload(req.file.path);
      req.body.image = [result.url];
    } catch (err) {
      console.log(err);
    }
  } else {
    let paths = req.files.map((file) => file.path);
    const images = await Promise.all(
      paths.map(async (path) => {
        try {
          const result = await uploader.upload(path);
          return result.url;
        } catch (err) {
          console.log(err);
        }
      })
    );
    console.log("images", images)
    req.body.image = images;
  }
  

  next();
};

exports.parse = parse;
