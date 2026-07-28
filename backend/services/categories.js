import Joi from "joi";

import {
    createValidationSchema,
    updateValidationSchema
} from "../schemas/category.js"
import { 
    ConflictError, 
    DatabaseError, 
    NotFoundError, 
    ValidationError 
} from "../utils/Error.js";

export default class CategoryService {
    constructor(categoryRepo, sequelize) {
        this.categoryRepo = categoryRepo
        this.sequelize = sequelize
    }

    async getAll() {
        try {
            return await this.categoryRepo.getAll();
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getById(id) {
        const numericId = Number(id);
        if (!numericId || numericId === NaN) {
            throw new ValidationError("id must be integer")
        }
        try {
            return await this.categoryRepo.getById(numericId);
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }

    async getByName(name) {
        try {
            return await this.categoryRepo.getByName(name);
        }
        catch(err) {
            throw new DatabaseError(err.message);
        }
    }

    async create(body) {
        // حذف فاصله های اضافی
        const normalizedName = body.name.trim();
        
        const { value: categoryValue, error: categoryError } = createValidationSchema.validate({
            name: normalizedName,
            parent_id: body?.parent_id || null
        }, {
            abortEarly: false
        })
        
        if (categoryError) {
            throw new ValidationError(categoryError.message)
        }

        // ایا category با این نام وجود دارد؟
        const existingCategory = await this.getByName(normalizedName);
        if (existingCategory) {
            throw new ConflictError("There is a category with this name.", 409)
        }
        if (categoryValue.parent_id) {
            const parentExists = await this.getById(categoryValue.parent_id);
            if (!parentExists) {
                throw new ValidationError("Parent category does not exists.")
            }
        }
        try {
            const result = await this.categoryRepo.create(categoryValue);
            return {
                id: result.id,
                name: result.name,
                parent_id: result.parent_id
            }
        }
        catch(err) {
            if (err instanceof ValidationError || err instanceof ConflictError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }

    async update(body, id) {
        if (!body || !body.name || !id || !body.parent_id) {
            throw new ValidationError("body is not valid")
        }
        
        const normalizedName = body.name.trim();

        const { value: categoryValue, error: categoryError } = updateValidationSchema.validate({
            id,
            name: normalizedName,
            parent_id: body.parent_id
        })
        if (categoryError) {
            throw new ValidationError(categoryError.message)
        }

        // ایا category وجود دارد؟
        const category = await this.getById(categoryValue.id);
        if (!category) {
            throw new NotFoundError("Category does not exists.")
        }

        try {
            await this.categoryRepo.update(categoryValue);
            return {
                id,
                name: categoryValue.name,
                parent_id: categoryValue.parent_id
            };
        }

        catch(err) {
            if (err instanceof NotFoundError || err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message);
        }
    }

    async remove(id) {
        // ایا category وجود داره و id از نوع number
        const category = await this.categoryRepo.getById(id)
        if (!category) {
            throw new NotFoundError("Category does not exists.")
        }

        try {
            return await this.categoryRepo.remove(id)
        }
        catch(err) {
            if (err instanceof NotFoundError) {
                throw err
            }
            throw new DatabaseError(err.message)
        }
    }
}