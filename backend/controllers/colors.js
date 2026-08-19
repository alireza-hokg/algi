export default class ColorController {
    constructor(colorService) {
        this.colorService = colorService
    }

    async getAll(req, res) {
        try {
            const result = await this.colorService.getAll();
            return res.success(result, "Colors loaded successfully.")
        }
        catch(err) {
            res.error(err.message, err.statusCode || 500)
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try {
            const result = await this.colorService.getById(id);
            res.success(result)
        }
        catch(err) {
            res.error(err.message, err.statusCode || 500)
        }
    }

    async create(req, res) {
        try {
            const result = await this.colorService.create(req.body)
            res.created(result, "Color created successfully.")
        }
        catch(err) {
            res.error(err.message, err.statusCode || 500)
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const result = await this.colorService.update(req.body, id);
            res.updated(result, "color updated successfully.")
        }
        catch(err) {
            res.error(err.message, err.statusCode || 500)
        }
    }

    async remove(req, res) {
        try {
            const { id } = req.params;
            const result = await this.colorService.remove(id);
            res.deleted(result, "Color deleted successfully.")
        }
        catch(err) {
            res.error(err.message, err.statusCode || 500)
        }
    }
}