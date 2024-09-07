import Joi from "joi";

const signupValidation = {
    
    body:  Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required(),
            password:Joi.string().required()
        }).required(),
   
}
const loginValidation = {