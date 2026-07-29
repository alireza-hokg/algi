import Joi from "joi";

export const registerValidationSchema = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required()
})