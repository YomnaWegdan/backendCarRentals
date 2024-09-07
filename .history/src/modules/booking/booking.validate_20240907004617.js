import Joi from "joi";

const createBookingValidation = {
    body:  Joi.object({
            car:generalFiled.id.required(),
            user:generalFiled.id.required(),
            from:Joi.date().required(),
            to:Joi.date().required(),
            totalPrice:Joi.number().required(),
            status:Joi.boolean().required() 
        }).required(),

    headers: Joi.object({
        token: Joi.string().required()
      }).unknown(true)
    }

    const updateBookingValidation = {
        body:  Joi.object({
                car:generalFiled.id.optio(),
                user:generalFiled.id.required(),
                from:Joi.date().required(),
                to:Joi.date().required(),
                totalPrice:Joi.number().required(),
                status:Joi.boolean().required() 
            }).required(),