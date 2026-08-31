export default class cartItemRepo {
    constructor(Cart_Item) {
        this.Cart_Item = Cart_Item
    }

    async getOne(body, transaction) {
        return await this.Cart_Item.findOne({
            where: {
                cart_id: body.cart_id,
                variant_id: body.variant_id
            }
        }, {
            transaction
        })
    }

    async create(body, transaction) {
        return await this.Cart_Item.create(
            body,
            {
                transaction
            }
        )
    }
}