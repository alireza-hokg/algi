import { X } from "lucide-react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import { post } from "../../services/api";
import Sylvanas from "../../assets/images/download.jpg"
import "./style.css"

const Carts = () => {
    const [carts, setCarts] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            const { data: cartsData } = await post("/carts", {
                status: "active"
            });
            console.log(cartsData)
            setCarts(cartsData?.body);
        }
        fetchData();
    }, [])


    return(
        <section>
            <div className="flex justify-center items-center py-6 bg-pink-200">
                <h1 className="text-white">سبد خرید فروشگاه</h1>
            </div>
            <ul className="py-6 px-2">
                {carts?.map(cart=> (
                    <li
                        className="flex mb-8 relative gap-x-4"
                        key={cart.id}
                    >
                        <div className="basis-4/12 min-w-25">
                            <img
                                className="w-full bg-cover h-full"
                                src={Sylvanas}
                            />
                        </div>
                        <div className="flex-1 space-y-1.5">
                            <span className="absolute top-0 left-0">
                                <X />
                            </span>
                            <div>
                                <span>{cart?.product?.name}</span>
                            </div>
                            <div className="before:content-['قیمت'] flex justify-between text-xs border-b
                            border-gray-200 py-1">
                                <span>
                                    {Number(cart?.price || null).toLocaleString("fa-IR")}{" "}
                                    تومان
                                </span>
                            </div>
                            <div className="before:content-['تعداد'] flex justify-between text-xs border-b
                            border-gray-200 py-1">
                                <span>{cart?.quantity}</span>
                            </div>
                            <div className="detail-total flex justify-between text-xs border-b border-gray-200
                            py-1">
                                <span>
                                    {Number(cart?.price * cart?.quantity).toLocaleString("fa-IR")}{" "}
                                    تومان
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
export default Carts;