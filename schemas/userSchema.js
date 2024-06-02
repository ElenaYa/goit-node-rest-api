import Joi from "joi";

export const registerUserSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).trim().required()
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).trim().required()
});

export const emailSchema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
  });
  