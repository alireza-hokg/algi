import Joi from "joi";

export const createValidationSchema = Joi.object().keys({
    name: Joi.string().required().min(2).max(100),
    parent_id: Joi.number().optional().allow(null)
})

export const updateValidationSchema = Joi.object().keys({
    id: Joi.number().required().min(1),
    name: Joi.string().required().min(2).max(100),
    parent_id: Joi.number().optional().allow(null)
})