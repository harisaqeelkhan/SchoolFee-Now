const mongoose = require('mongoose');

exports.validateObjectId = (req, res, next) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
  next();
};

exports.validateBody = (requiredFields) => {
  return (req, res, next) => {
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ success: false, message: `Missing required field: ${field}` });
      }
    }
    next();
  };
};
