import Joi from "joi-browser";


export const restaurantRegisterSchema = {
    restaurantName: Joi.string().required(),
    email: Joi.string().required(),
    restaurantAddress:Joi.string().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.number().required()
}

export const loginSchema={
    email: Joi.string().required(),
    password: Joi.string().required()
}

export const userRegisterSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(7).required(),
    phoneNumber: Joi.number().required()
};

export const userSettingsSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(7),
    phoneNumber: Joi.number().required()
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