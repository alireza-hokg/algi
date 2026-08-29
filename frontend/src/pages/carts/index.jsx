
import { useState } from "react";
import { useEffect } from "react";

import { get } from "../../services/api";
import "./style.css";
import CartItem from "../../components/cart/CartItem";

const Carts = () => {
    const [cart, setCart] = useState([]);

    // گرفتن سبد خرید کاربر با status و userId(userId خودکار فرستاده میشه)
    useEffect(()=> {
        const fetchData = async () => {
            const { data: cartData } = await get("/carts/items?status=active");
            console.log(cartData)
            setCart(cartData?.body);
        }
        fetchData();
    }, [])

    return(
        <section className="mx-auto p-6 max-w-4xl border border-gray-200 rounded-2xl my-6">
            {/* عنوان سبد خرید مشابه هافکو */}
            <div
                className="flex justify-between"
            >
                <div className="space-x-2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-10 pb-2 border-b-2 border-orange-500 inline-block">
                        سبد خرید
                    </h2>
                    <span className="text-sm text-gray-500">
                        {cart?.Cart_Items?.length}{" "}
                        کالا
                    </span>
                </div>
                <div>
                    <button
                        className="cursor-pointer"
                    >
                        حذف همه
                    </button>
                </div>
            </div>
            {/* لیست محصولات */}
            <ul className="space-y-4">
                {cart?.Cart_Items?.map((cart_item) => (
                    <li
                        className="border-b border-gray-200 py-4"
                        key={cart_item.id}
                    >
                        <CartItem
                            cart_item={cart_item}
                        />
                    </li>
                ))}
            </ul>

            {/* بخش جمع کل */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-lg font-bold text-gray-800">جمع کل سبد خرید:</span>
                <span className="text-2xl font-bold text-orange-600">
                    
                    {Number(
                    cart?.final_price
                    ).toLocaleString("fa-IR")}{" "}
                    تومان
                </span>
                <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium
                rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                    ادامه فرآیند خرید
                </button>
                </div>
            </div>
        </section>
    )
}
export default Carts;