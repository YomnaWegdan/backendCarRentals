import Joi from "joi";

const createCarValidation = {
    body:  Joi.object({
            name:Joi.string().required(),
        }).required(),
        headers: Joi.object({
            token: Joi.string().required()
          }).unknown(true)
}


export {createCarValidation }
