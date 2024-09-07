import Joi = require("joi");

const signupValidation = {
    
    body:  Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required(),
            password:Joi.string().required()
        }).required(),
    headers: Joi.object({
        token: Joi.string().required()
      }).unknown(true)
}