import { ConflictError, DatabaseError, NotFoundError, ValidationError } from "../utils/Error.js"
import { createValidationSchema, updateValidationSchema } from "../schemas/colors.js";

export default class ColorService {
    constructor(colorRepo) {
        this.colorRepo = colorRepo
    }

    async getAll() {
        try {
            return await this.colorRepo.getAll();
        }
        catch(err) {
            throw new DatabaseError(err.message);
        }
    }

    async getById(colorId) {
        const numericColorId = Number(colorId);
        if (!numericColorId) {
            throw new ValidationError("colorId must be integer.")
        }

        try {
            return await this.colorRepo.getById(numericColorId);
        }
        catch(err) {
            if (err instanceof ValidationError) {
                throw err
            }
            throw new DatabaseError(err.message);
        }
    }

    async getColorByName(name) {
        try {
            return await this.colorRepo.getByName(name)
        }
        catch(err) {

            throw new DatabaseError(err.message)
        }
    }

    async create(body) {
        try {
            const { value: colorValue, error: colorError } = createValidationSchema.validate({
                name: body.name,
                hex: body.hex
            })
            if (colorError) {
                throw new ValidationError(colorError.message)
            }
            const color = await this.getColorByName(body.name)
            if (color) {
                throw new ConflictError("A color with this name exists.")
            }
            return await this.colorRepo.create(colorValue);
        }
        catch(err) {
            if (err instanceof ValidationError && err instanceof ConflictError) {
                throw err
            }
            throw new DatabaseError(err.message);
        }
    }

    async update(body, colorId) {
        const numericColorId = Number(colorId);
        if (!numericColorId) {
            throw new ValidationError("colorId must be integer.")
        }
        
        try {
            const { value: colorValue, error: colorError } = updateValidationSchema.validate({ 
                id: numericColorId,
                name: body.name,
                hex: body.hex
            })
            if (colorError) {
                throw new ValidationError(colorError.message)
            }
            const colorExists = await this.getColorByName(body.name);
            if (colorExists && colorExists.id !== colorValue.id) {
                throw new ConflictError("A color with this name exists.")
            }
            const updatedColor = await this.colorRepo.update(colorValue);
            return updatedColor;
        }
        catch(err) {
            if (err instanceof ValidationError && err instanceof ConflictError) {
                throw err
            }
            throw new DatabaseError(err.message);
        }
    }

    async remove(colorId) {
        const color = await this.getById(colorId);
        try {
            const result = await this.colorRepo.remove(colorId)
            return result
        }
        catch(err) {
            throw new DatabaseError(err.message)
        }
    }
}