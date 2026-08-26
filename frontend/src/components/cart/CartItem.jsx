const CartItem = ({
    cart_item
}) => {
    const variant = cart_item?.Variant;
    const product = cart_item?.Variant?.Product;
    console.log(product)

    const imageIdx = product?.Product_Images.findIndex(image => {
        return image.is_main
    })

    const image = imageIdx > 0 ? 
        product?.Product_Images.find(image => image.is_main) :
        product?.Product_Images[0];
    return (
        <>
            <div>
                <img
                    src={`http://localhost:9000/uploads/${image.image_url}`}
                />
            </div>
        </>
    )
}
export default CartItem;