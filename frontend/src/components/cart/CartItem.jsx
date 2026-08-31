const CartItem = ({
    cart_item
}) => {
    const variant = cart_item?.Variant;
    const product = cart_item?.Variant?.Product;
    const colors = cart_item?.Variant?.Colors;
    
    const imageIdx = product?.Product_Images.findIndex(image => {
        return image.is_main
    })

    const image = imageIdx > 0 ? 
        product?.Product_Images.find(image => image.is_main) :
        product?.Product_Images[0];
    return (
        <div
            className="flex gap-x-4"
        >
            <div
                className="w-37.5 h-37.5 rounded-md overflow-hidden"
            >
                <img
                    className="w-full h-full"
                    src={`http://localhost:9000/uploads/${image.image_url}`}
                />
            </div>
            <div
                className="flex flex-col flex-1"
            >
                <div
                    className="flex-1 flex justify-between"
                >
                    <div
                        className="flex flex-col"
                    >
                        <span>
                            {product?.name}
                        </span>
                        <div>
                            رنگ {}
                        </div>
                    </div>
                    <div>
                        <span>132,000</span>
                        <span>تومان</span>
                    </div>
                </div>
                <div
                    className="flex justify-end"
                >
                    <div
                        className="flex gap-x-4 border border-gray-200 rounded-3xl py-2 px-4 text-red-500
                        items-center"
                    >
                        <button
                            className="cursor-pointer text-2xl"
                        >+</button>
                        <span>1</span>
                        <button
                            className="cursor-pointer"
                        >حذف</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartItem;