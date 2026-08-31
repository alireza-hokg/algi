import Joi from "joi";

export const createCartSchema = Joi.object().keys({
    variant_id: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().required()
})