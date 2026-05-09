import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
    return (
        
        <main>
            <div className="my-6 px-2">
                {/* Title for products */}
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex flex-1 wrapper-title">
                        <span className="bg-white text-gray-600 text-2xl md:text-3xl font-bold
                        border-gray-400 border rounded-sm px-4 py-2">جدیدترین محصولات</span>

                    </div>
                    <div className="">
                        <Link className="flex items-center space-x-8">
                            همه
                            <ArrowLeft />
                        </Link>
                    </div>
                </div>
                {/* Products list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">

                </div>
            </div>
        </main>
    )
}
export default Products;