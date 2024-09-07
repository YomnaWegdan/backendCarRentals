const createBookingValidation = {
    body:  Joi.object({
            car:generalFiled.id.required(),
            user:generalFiled.id.required(),
            from:Joi.date().required(),
            to:Joi.date().required(),
            totalPrice:Joi.number().required(),
            status:Joi.boolean().required()