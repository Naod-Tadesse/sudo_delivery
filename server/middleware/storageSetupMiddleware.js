const storageSetup = (type) => (req, res, next) => {
  req.params.type = type;
  next();
};

exports.storageSetup = storageSetup;
