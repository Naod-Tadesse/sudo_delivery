import Joi from "joi-browser";


export const restaurantRegisterSchema = {
    restaurantName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required(),
    restaurantAddress:Joi.string().min(2).max(60).required(),
    password: Joi.string().min(7).max(1024).required(),
    phoneNumber: Joi.number().min(10).required()
}

export const loginSchema={
    email: Joi.string().required(),
    password: Joi.string().required()
}

export const userRegisterSchema = {
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    username: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(7).max(1024).required(),
    phoneNumber: Joi.string().min(10).required()
};

export const userSettingsSchema = {
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  username: Joi.string().min(1).max(50).required(),
  email: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(7).max(1024).required(),
  phoneNumber: Joi.string().min(10).required()
}
export const foodSchema = {
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    images: Joi.array().min(1).required(),
    ingredients: Joi.array().min(2).required()

  }

  export const userSettingsSchemaWithoutPassword = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.number().required()
  }

  export const restaurantSettings = {
    name : Joi.string().required(),
    address : Joi.string().required(),
    email : Joi.string().required(),
    phoneNumber : Joi.number().required(),
    description: Joi.string(),
    password : Joi.string().min(7).required(),
    profilePicture : Joi.object()
  }

export const restaurantSettingsWithoutPassword = {
    name : Joi.string().required(),
    address : Joi.string().required(),
    email : Joi.string().required(),
    description: Joi.string(),
    phoneNumber : Joi.number().required(),
    profilePicture : Joi.object()
}