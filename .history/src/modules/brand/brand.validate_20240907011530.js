const createCarValidation = {
    body:  J.object({
            name:Joi.string().required(),
        }).required(),


}
