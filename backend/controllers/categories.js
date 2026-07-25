export default class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService
    }

    async getAll(req, res) {
        try {
            const result = await this.categoryService.getAll();
            res.success(result)
        }
        catch(err) {
            console.log(err.message)
            res.error(err.message)
        }
    }

    async create(req, res) {
        
        try {
            const result = await this.categoryService.create(req.body);
            console.log(result)
            if (result) {
                res.created(result)
            }
        }
        catch(err) {
            res.error(err.message)
        }
    }
}