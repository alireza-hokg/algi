import Joi from "joi";
import { DatabaseError, ValidationError } from "../utils/Error.js";

export default class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo
    }

    async getAll() {
        try {
            return await this.categoryRepo.getAll();
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getByName(body) {
        const categoryValidationSchema = Joi.object().keys({
            name: Joi.string().required
        })
        const { value: categoryValue, error: categoryError } = categoryValidationSchema.validate({
            name: body.name
        })
        if (categoryError) {
            throw new ValidationError(categoryError)
        }
        try {
            const result = await this.categoryRepo.getByName(body.name)
            return result
        }
        catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message);
        }
    }

    async create(body) {
        const categoryValidationSchema = Joi.object().keys({
            name: Joi.string().required(),
            parent_id: Joi.number().optional()
        })
        const { value: categoryValue, error: categoryError } = categoryValidationSchema.validate({
            name: body.name,
            parent_id: body?.parent_id
        })
        if (categoryError) {
            throw new ValidationError(error.message)
        }
        try {
            return await this.categoryRepo.getByName(categoryValue)
        }
        catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }
}