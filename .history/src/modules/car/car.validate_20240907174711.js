import Joi from "joi";
import { generalFiled } from "../../middlewares/generalFields.js";

const createCarValidation = {
  body: Joi.object({
    brand: generalFiled.id.required(),
    model: Joi.string().required(),
    year: Joi.number().required(),
    pricePerDay: Joi.number().required(),
    availability: Joi.boolean().required(),
  }).required(),
  files: Joi.object({
    image: Joi.array().items(generalFiled.file.required()).required(),
    coverImages: Joi.array().items(generalFiled.file.required()).required(),
  }).required(),

  headers: Joi.object({
    token: Joi.string().required(),
  }).unknown(true),
};

const updateCarValidation = {
  body: Joi.object({
    brand: generalFiled.id.optional(),
    model: Joi.string().optional(),
    year: Joi.number().optional(), 
    pricePerDay: Joi.number().required(),
    availability: Joi.boolean().required(),
  }).required(),
  files: Joi.object({
    image: Joi.array().items(generalFiled.file.required()).required(),
    coverImages: Joi.array().items(generalFiled.file.required()).required(),
  }).required(),

  headers: Joi.object({
    token: Joi.string().required(),
  }).unknown(true),
};

export default { createCarValidation, updateCarValidation };
