import Joi from "joi";

export const createCartSchema = Joi.object().keys({
    variant_id: Joi.number().required(),
    quantity: Joi.number().required()
})