import Joi from "joi";

export const createValidationSchema = Joi.object().keys({
    name: Joi.string().required(),
    category_id: Joi.number().required(),
    price: Joi.number().required(),
    sku: Joi.string().required(),
    slug: Joi.string().required(),
})

export const updateValidationSchema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    category_id: Joi.number().required(),
    price: Joi.number().required(),
    sku: Joi.string().required(),
    slug: Joi.string().required(),
})