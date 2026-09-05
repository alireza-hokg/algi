import Joi from "joi";

export const registerValidationSchema = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
})

export const updateValidationSchema = Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional()
})

export const updateRoleValidationSchema = Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    role: Joi.string().valid("customer", "admin").required()
})