import { X } from "lucide-react";

import Sylvanas from "../../assets/images/download.jpg";
import { post, put } from "../../services/api";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const CartItem = ({ cart }) => {
    const { user } = useAuth();
    const [count, setCount] = useState(cart?.quantity || 0);

    const updateQuantity = async (count) => {
        // اعتبارسنجی ورودی
        if (count < 0) {
            console.warn("quantity can't be negative")
            return false;
        }

        const cartData = {
            user_id: user.id,
            product_id: cart?.product_id,
            price: cart?.product?.price,
            quantity: count,
            status: "active"
        }
        try {
            const { data: createdCart } = await post("/carts/add", cartData)
            return createdCart.success
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const adjustQuantity = async (newCount) => {
        if (newCount < 0) {
            console.warn("quantity can't be negative")
            return false;
        }

        const cartData = {
            cartId: cart.id,
            quantity: newCount,
        }
        try {
            const { data: adjustedCart } = await put("/carts/adjust", cartData);
            return adjustedCart
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const onChangeQuantity = (e) => {
        const target = e.target;
        setCount(target.value);
        adjustQuantity(target.value)
    }

    const handleIncreaseQuantity = () => {
        setCount(prev => prev+1);
        updateQuantity(1)
    }

    const handleDecreaseQuantity = () => {
        setCount(prev => prev-1)
        updateQuantity(-1)
    }

    const handleRemoveItem = () => {

    }

    return(
        <div
            key={cart.id}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl
            shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
        >
                {/* تصویر محصول با ابعاد ثابت */}
            <div className="w-28 h-28 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={Sylvanas}
                    alt={cart?.product?.name}
                />
            </div>

            {/* اطلاعات محصول */}
            <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    {/* نام محصول */}
                    <h3 className="text-base font-semibold text-gray-800">
                    {cart?.product?.name}
                    </h3>

                    {/* قیمت واحد */}
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                    قیمت:{" "}
                    <span className="text-gray-700 font-medium">
                        {Number(cart?.price || 0).toLocaleString("fa-IR")} تومان
                    </span>
                    </span>
            </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-3 border-t
                border-gray-100">
                    {/* کنترل‌های افزایش/کاهش تعداد */}
                    <div className="flex-0 flex text-sm">
                        <button 
                            className={`p-2 rounded-2xl border-2 border-gray-200 hover:bg-amber-500
                            hover:border-amber-500 hover:text-white cursor-pointer
                            ${cart?.quantity ===0 ? "opacity-50 cursor-grab hover:border-gray-200" : null}`}
                            onClick={handleDecreaseQuantity}
                            disabled={cart?.count===0 ? true : false}
                        >-</button>
                        <input
                            type="number"
                            value={count}
                            onChange={onChangeQuantity}
                            className="focus:outline-0 border-y max-w-16 min-w-12 text-center"
                        />
                        <button
                            className="p-2 rounded-2xl border-2 border-gray-200 hover:bg-amber-500
                            hover:border-amber-500 hover:text-white cursor-pointer"
                            onClick={handleIncreaseQuantity}
                        >+</button>
                    </div>

                    {/* جمع جزء (قیمت کل) */}
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <span className="text-sm text-gray-500">جمع جزء:</span>
                    <span className="text-base font-bold text-orange-600">
                        {Number(cart?.price * cart?.quantity || 0).toLocaleString(
                        "fa-IR"
                        )}{" "}
                        تومان
                    </span>
                    </div>

                    {/* دکمه حذف (آیکون X) - مشابه هافکو */}
                    <button
                    onClick={() => handleRemoveItem(cart.id)}
                    className="mt-2 sm:mt-0 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                    <X className="w-5 h-5" />
                    </button>
                </div>
                </div>
            </div>
    )
}
export default CartItem;