export default class ColorRepo {
    constructor(Color) {
        this.Color = Color;
    }

    async getAll() {
        return await this.Color.findAll();
    }

    async getById(id) {
        return await this.Color.findByPk(id)
    }

    async getByName(name) {
        return await this.Color.findOne({
            where: {
                name
            }
        })
    }

    async create(data) {
        return await this.Color.create(data)
    }

    async update(data) {
        return await this.Color.update({
            name: data.name,
            hex: data.hex
        }, {
            where: {
                id: data.id
            }
        })
    }

    async remove(id) {
        return await this.Color.destroy({
            where: {
                id
            }
        })
    }
}