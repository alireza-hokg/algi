
export default class CategoryRepo {
    constructor(Category) {
        this.Category = Category
    }

    async getAll() {
        return await this.Category.findAll();
    }

    async getByName(name) {
        return await this.Category.findOne({
            where: {
                name
            }
        })
    }

    async create(body) {
        return await this.Category.create(body)
    }
}