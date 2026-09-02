import { Link } from "react-router-dom";
import { Check, Heart, Search, ShoppingCart, TrendingUpDown } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth.js"
import "./style.css"
import { useCompare } from "../../../hooks/useCompare.js";
import Spinner from "../Spinner.jsx";

const ProductItem = ({ 
    product,
    setProduct,
    toggleActive,
    getProduct
}) => {
    const imageIdx = product?.Product_Images.findIndex(image => {
        return image.is_main
    })

    const { user } = useAuth();
    const { handleAddCompare, loading, isCompared } = useCompare()

    const image = imageIdx > 0 ? 
        product?.Product_Images.find(image => image.is_main) :
        product?.Product_Images[0];

    return(
        <li className="pb-10 rounded-md shadow-sm overflow-hidden">
            <figure className="h-full flex flex-col gap-y-12 group/card">
            
                {/* IMAGE */}
                <div className="relative overflow-hidden h-70">
                    <ul className="absolute top-1 left-1 flex flex-col bg-white/80 text-gray-800 gap-y-2
                    group-hover/card:flex rounded-sm py-1 opacity-0 group-hover/card:opacity-100 duration-300">
                        <li className="relative group/action">
                            <div
                                className="cursor-pointer px-3 py-1.5 hover:text-gray-500 border-b"
                            >
                                {loading ? <Spinner /> : 
                                isCompared(product?.id) ? (
                                    <Link to={"/compare"}>
                                        <Check />
                                    </Link>
                                ) : (
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => handleAddCompare(product)}
                                    >
                                        <TrendingUpDown />
                                    </button>
                                )}
                            </div>
                            <span className="absolute top-0 bottom-0 left-full translate-x-4 badge bg-black
                            px-3 h-8 text-sm text-white flex items-center opacity-0 group-hover/action:opacity-100
                            pointer-events-none whitespace-nowrap">
                                مقایسه
                            </span>
                        </li>
                        <li className="relative group/action">
                            <button className="cursor-pointer px-3 py-1.5 hover:text-gray-500 border-b">
                                <Heart />
                            </button>
                            <span className="absolute top-0 bottom-0 left-full translate-x-4 badge bg-black
                            px-3 h-8 text-sm text-white flex items-center opacity-0 group-hover/action:opacity-100
                            pointer-events-none whitespace-nowrap">
                                علاقه مندی ها
                            </span>
                        </li>
                        <li className="relative group/action">
                            <button className="cursor-pointer px-3 py-1.5 hover:text-gray-500">
                                <Search />
                            </button>
                            <span className="absolute top-0 bottom-0 left-full translate-x-4 badge bg-black
                            px-3 h-8 text-sm text-white flex items-center opacity-0 group-hover/action:opacity-100
                            pointer-events-none whitespace-nowrap">
                                جستجوی سریع
                            </span>
                        </li>
                    </ul>
                    {product.Product_Images?.length > 0 ? (
                        <Link
                            to={`/products/slug/${product.slug}`}
                            className="flex-1"
                        >
                            <img
                                className="w-full inline-block h-full object-cover"
                                src={`http://localhost:9000/uploads/${image?.image_url}`}
                            />
                        </Link>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            {user?.role === "admin" && (
                                <Link
                                    className="bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-md
                                    text-white"
                                    to={`/products/${product?.id}/images`}
                                >
                                    ساخت عکس
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                <figcaption>
                    <div className="space-y-4">
                        <div className="flex flex-col mx-4 space-y-1 items-center">
                            <h3 className="text-[#555]">{product.name}</h3>
                            <div className="space-x-1">
                                <span className="text-sm line-through decoration-1 decoration-gray-500
                                text-gray-500">{(product?.discount_price)?.toLocaleString("fa-IR")}</span>{" "}
                                <span className="text-amber-500 font-extrabold">{(product.price).toLocaleString("fa-IR")} تومان</span>
                            </div>
                        </div>
                        <div className={`flex  justify-center mt-4 ${user?.role === "admin" ? 
                        "flex-col items-center gap-y-2" : null}`}>
                            <Link
                                className="inline-block relative bg-lime-500 py-2 px-6 rounded-lg text-white group overflow-hidden"
                                to={`/products/slug/${product.slug}`}
                            >
                                <span className="inline-block group-hover:-translate-y-20 duration-300">انتخاب گزینه ها</span>
                                <ShoppingCart
                                    className="absolute top-0 bottom-0 left-0 right-0 m-auto translate-y-20
                                    group-hover:translate-y-0 duration-300"
                                />
                            </Link>
                            {user?.role === "admin" ? (
                                <button
                                    onClick={async () => {
                                        toggleActive()
                                        const selectedProduct = await getProduct(product.id)
                                        setProduct(selectedProduct)
                                    }}
                                    className="rounded-lg border border-blue-200 bg-blue-50 px-6 py-2.5
                                    text-sm font-medium text-blue-600 transition
                                    hover:bg-blue-100 active:scale-95 cursor-pointer"

                                >
                                    ویرایش
                                </button>
                            ) : null}
                        </div>
                    </div>
                </figcaption>
            </figure>
        </li>
    )
}

export default ProductItem;