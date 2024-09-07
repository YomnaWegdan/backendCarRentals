import Joi from "joi";

const createBrandValidation = {
    body:  Joi.object({
            name:Joi.string().required(),
        }).required(),
        headers: Joi.object({
            token: Joi.string().required()
          }).unknown(true)
}
const updateBrandCarValidation = {



export {createBrandValidation }
