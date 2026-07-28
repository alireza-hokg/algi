import Joi from "joi";

export const createValidationSchema = Joi.object().keys({
    product_id: Joi.number().required(),
    image_url: Joi.string().required(),
    image_text: Joi.string().optional().allow(null),
    is_main: Joi.boolean().optional().allow(null),
    size: Joi.number().optional().allow(null),
    mime_type: Joi.string().optional().allow(null)
})