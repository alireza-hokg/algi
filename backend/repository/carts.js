
export default class CartRepo {
    constructor(Cart, Variant, Cart_Item) {
        this.Cart = Cart;
        this.Variant = Variant
        this.Cart_Item = Cart_Item
    }
    // body {
    // user_id => req.userId
    // status => active - abandoned - purchased
    // }
    async exists(body, transaction) {
        const result = await this.Cart.findOne({
            where: {
                user_id: body.user_id,
                status: body.status
            },
        }, {
            transaction
        })
        return !!result
    }

    async getCartAndItems(body) {
        const result = await this.Cart.findOne({
            where: {
                status: body.status,
                user_id: body.user_id
            },
            include: [
                {
                    model: this.Cart_Item,
                }
            ]
        })
        return result
    }

    async create(body, transaction) {
        return await this.Cart.create(
            body,
            {
                transaction
            }
        )
    }

}