
export default class CategoryRepo {
    constructor(Category) {
        this.Category = Category
    }

    async getAll() {
        return await this.Category.findAll();
    }

    async getById(id, transaction) {
        return await this.Category.findByPk(id, {
            transaction
        })
    }

    async getByName(name) {
        return await this.Category.findOne({
            where: {
                name
            }
        })
    }

    async create(body, transaction) {
        return await this.Category.create(body, {
            transaction
        })
    }

    async update(body) {
        return await this.Category.update(body, {
            where: {
                id: body.id
            }
        })
    }

    async remove(id) {
        return await this.Category.update({
            is_active: false
        }, {
            where: {
                id
            }
        })
    }
}