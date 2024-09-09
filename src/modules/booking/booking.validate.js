import Joi from "joi";
import {generalFiled} from "../../middlewares/generalFields.js"

const createBookingValidation = {
    body:  Joi.object({
            car:generalFiled.id.required(),
            user:generalFiled.id.required(),
            startDate:Joi.date().required(),
            endDate:Joi.date().required(),
            // totalPrice:Joi.number().required(),
            status:Joi.string()
        }).required(),

    headers: Joi.object({
        token: Joi.string().required()
      }).unknown(true)
    }

export {createBookingValidation }
