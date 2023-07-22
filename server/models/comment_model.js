const Joi = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

exports.Comment = Comment;
