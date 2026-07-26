export default class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService
    }

    async getAll(req, res) {
        try {
            const result = await this.categoryService.getAll();
            res.success(result, "All Categories loaded successfully")
        }
        catch(err) {
            console.log(err.message)
            res.error(err.message, err.statusCode)
        }
    }

    async create(req, res) {
        
        try {
            const result = await this.categoryService.create(req.body);
            res.created(result, "Category created succussfully.")
        }
        catch(err) {
            res.error(err.message, err.statusCode)
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const result = await this.categoryService.update(req.body, id)
            res.updated(result, "Category updated successfully.")
        }
        catch(err) {
            res.error(err.message, err.statusCode)
        }
    }

    async remove(req, res) {
        const { id } = req.params;
        try {
            const result =  await this.categoryService.remove(id)
            res.deleted(result, "Category deleted successfully.")
        }
        catch(err) {
            res.error(err.message, err.statusCode)
        }
    }
}