export default class ColorRepo {
    constructor(Color) {
        this.Color = Color;
    }

    async getAll() {
        return await this.Color.findAll();
    }

    async getByName(name) {
        return await this.Color.findOne({
            where: {
                name
            }
        })
    }

    async create(color) {
        return await this.Color.create(color)
    }

    async update(color) {
        return await this.Color.update({
            name: color.name,
            hex: color.hex
        }, {
            where: {
                id: color.id
            }
        })
    }
}