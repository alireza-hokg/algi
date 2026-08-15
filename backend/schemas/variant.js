import Joi from "joi";

export const createValidationSchema = Joi.object().keys({
    product_id: Joi.number().required(),
    size: Joi.string().required(),
    quantity: Joi.string().required(),
    height: Joi.string().required(),
    width: Joi.string().required(),
    waist: Joi.string().required()
})