const parse = (req, res, next) => {
  //this function sets the req.file or req.files properties set by the multer to req.body
  if (req.file) {
    req.body.image = [req.file.filename];
  } else {
    let image = req.files.map((file) => file.filename);
    req.body.image = image;
  }

  next();
};

exports.parse = parse;
