import Joi from "joi";

export const createValidationSchema = Joi.object().keys({
    color_id: Joi.number().required(),
    variant_id: Joi.number().required(),
    stock_quantity: Joi.number().required(),
})