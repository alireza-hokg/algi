import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Product from "./Product.jsx";

const Products = () => {
    return (
        
        <main>
            <div className="my-10 px-2">
                {/* Title for products */}
                <div className="flex items-center justify-between space-x-4 mb-6">
                    <div className="flex flex-1 wrapper-title">
                        <span className="relative order-8 bg-white text-gray-600 text-xl sm:text-2xl 
                            md:text-3xl font-bold border-gray-300 border-2 rounded-sm px-4 py-2"
                        >جدیدترین محصولات</span>

                    </div>
                    <div className="">
                        <Link className="flex items-center space-x-8">
                            همه
                            <ArrowLeft />
                        </Link>
                    </div>
                </div>
                {/* Products list */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-y-10">
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </ul>
            </div>
        </main>
    )
}
export default Products;