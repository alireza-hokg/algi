
import { useState } from "react";
import { useEffect } from "react";

import { post } from "../../services/api";
import "./style.css";
import CartItem from "../../components/cart/CartItem";

const Carts = () => {
    const [carts, setCarts] = useState([]);

    // گرفتن سبد خرید کاربر با status و userId(userId خودکار فرستاده میشه)
    useEffect(()=> {
        const fetchData = async () => {
            const { data: cartsData } = await post("/carts", {
                status: "active"
            });
            setCarts(cartsData?.body);
        }
        fetchData();
    }, [])

    return(
        <section className="mx-auto px-4 py-8 max-w-4xl">
            {/* عنوان سبد خرید مشابه هافکو */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-orange-500 inline-block">
                سبد خرید
            </h2>

            {/* لیست محصولات */}
            <div className="space-y-4">
                {carts?.map((cart) => (
                    <CartItem
                        key={cart.id}
                        cart={cart}
                    />
                ))}
            </div>

            {/* بخش جمع کل - مشابه هافکو */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-lg font-bold text-gray-800">جمع کل سبد خرید:</span>
                <span className="text-2xl font-bold text-orange-600">
                    {Number(
                    carts?.reduce((total, cart) => total + cart.price * cart.quantity, 0)
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