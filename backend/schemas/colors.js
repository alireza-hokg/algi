import Joi from "joi";

export const createValidationSchema = Joi.object().keys({
    name: Joi.string().required(),
    hex: Joi.string().required()
})

export const updateValidationSchema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    hex: Joi.string()
        .pattern(/^[0-9A-Fa-f]{6}$/)
        .required()
})