import Joi from "joi";

const createCarValidation = {
    body:  Joi.object({
            name:Joi.string().required(),
        }).required(),


}
