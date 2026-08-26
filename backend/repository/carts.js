
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

    async getCartAndDetails(body) {
        const result = await this.Cart.findOne({
            where: {
                status: body.status,
                user_id: body.user_id
            },
            include: [
                {
                    model: this.Cart_Item,
                    include: [
                        {
                            association: "Variant",
                            include: [
                                {
                                    association: "Product",
                                    include: [
                                        {
                                            association: "Product_Images"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
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

    async update(body, transaction) {
        await this.Cart.update(
            {
                total_price: body.total_price,
                discount_price: body.discount_price,
                final_price: body.final_price,
                expires_at: body.expires_at
            },
            {
                where: {
                    id: body.id
                },
                transaction
            }
        )
        return {
            id: body.id,
            total_price: body.total_price,
            discount_price: body.discount_price,
            final_price: body.final_price,
            expires_at: new Date(new Date() + 7 * 24 * 60 * 60 * 1000),
            createdAt: body.createdAt,
            updatedAt: new Date(),
            deletedAt: null
        }
    }

}