import { useQuantity } from "../../../hooks/useQuantity.js";

const ProductQuantity = ({ 
    handleAddToCart,
    selectedVariantId,
    selectedColorId
 }) => {
    const {
        quantity,
        decreaseQuantity,
        onChangeQuantity,
        increaseQuantity,
    } = useQuantity()
    
    return (
        <div className="flex items-center gap-x-4">
            <div className="flex-0 flex text-2xl">
                <button
                    className={`p-2 rounded-2xl border-2 border-gray-200 hover:bg-amber-500
                    hover:border-amber-500 hover:text-white cursor-pointer
                    ${quantity===0 ? "opacity-50 cursor-grab hover:border-gray-200" : null}`}
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1 ? true : false}
                >-</button>
                <input
                    type="text"
                    value={quantity}
                    onChange={onChangeQuantity}
                    className="focus:outline-0 border-y max-w-20 min-w-12 text-center"
                />
                <button
                    className="p-2 rounded-2xl border-2 border-gray-200 hover:bg-amber-500
                    hover:border-amber-500 hover:text-white cursor-pointer"
                    onClick={increaseQuantity}
                >+</button>
            </div>
            <button
                className="flex-1 bg-amber-500 hover:bg-black 
                text-white font-bold py-4 rounded-xl cursor-pointer transition-all 
                duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                onClick={()=> handleAddToCart({
                    variant_id: selectedVariantId,
                    quantity,
                    color_id: selectedColorId
                })}
            >
                افزودن به سبد خرید
            </button>
        </div>
    )
}
export default ProductQuantity;