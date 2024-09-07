import Joi from "joi";

const createCarValidation = {
    body:  Joi.object({
            brand:generalFiled.id.required(),
        model:Joi.string().required(),
            name:Joi.string().required(),
            pricePerDay:Joi.number().required(),
            discount:Joi.number().optional(),
            stoke:Joi.number().integer().required(),
            category:generalFiled.id.required(),
            subCategory:generalFiled.id.required(),
            brand:generalFiled.id.required(),

        }).required(),
        files:Joi.object({
            image:Joi.array().items( generalFiled.file.required()).required(),
            coverImages:Joi.array().items( generalFiled.file.required()).required()

        }).required(),

    // file: generalFiled.file.required(),
    headers: Joi.object({
        token: Joi.string().required()  
      }).unknown(true)
    }