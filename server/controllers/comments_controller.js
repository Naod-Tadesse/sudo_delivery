const _ = require("lodash");
const Joi = require("joi");

const { User } = require("../models/user_model");
const { Comment } = require("../models/comment_model");
const { Food } = require("../models/food_model");

exports.commentFoodUser = async (req, res) => {
  const toBeValidated = _.pick(req.body, ["userId", "foodId", "comment"]);

  const { error } = validateComment(toBeValidated);
  if (error)
    return res.status(400).json({
      errorMessage: error.details.map((errorObject) => errorObject.message),
    });

  //checking if user exists
  let user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("invalid user id");

  //compare the user id sent in req with user id from sent token
  if (user._id.toString() !== req.user._id)
    return res.status(400).send("invalid userid");
  //making user to commen only once per food
  let checkComment = await Comment.findOne({
    userId: req.body.userId,
    foodId: req.body.foodId,
  });
  if (checkComment)
    return res.status(400).send("you can only comment once per food");

  //checking if food exists
  let food = await Food.findById(req.body.foodId);
  if (!food) return res.status(400).send("invalid food id");

  let comment = new Comment({
    userId: req.body.userId,
    foodId: req.body.foodId,
    comment: req.body.comment,
  });

  await comment.save();

  //storing the comment reference in food
  food.comments.push(comment);

  await food.save();

  res.send(comment);
};

function validateComment(commentbody) {
  //validating schema for storing food details
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    foodId: Joi.objectId().required(),
    comment: Joi.string().required(),
  });
  return schema.validate(commentbody, { abortEarly: false });
}
