import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const ProductSectionTitle = () => {
    return (
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
    )
}
export default ProductSectionTitle;