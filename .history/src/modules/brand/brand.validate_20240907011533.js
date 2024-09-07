import Joi = require("joi");

const createCarValidation = {
    body:  Joi.object({
            name:Joi.string().required(),
        }).required(),


}
