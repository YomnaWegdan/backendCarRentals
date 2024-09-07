import Joi from "joi";

const createCarValidation = {
    body:  Joi.object({
            brand:generalFiled.id.required(),
            model:Joi.string().required(),
            name:Joi.string().required(),
            pricePerDay:Joi.number().required(),
            availability:Joi.boolean().required()
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

const updateCarValidation = {
    body:  Joi.object({
            brand:generalFiled.id.required(),
            model:Joi.string().required(),
            name:Joi.string().required(),
            pricePerDay:Joi.number().required(),
            availability:Joi.boolean().required()
        }).required(),
        files:Joi.object({
            image:Joi.array().items( generalFiled.file.required()).required(),
            coverImages:Joi.array().items( generalFiled.file.required()).required()

        }).required(),
        

export default createCarValidation