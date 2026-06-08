import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem.jsx";
import { useEffect, useState } from "react";
import { get } from "../../services/api.js";
import ErrorBoundary from "../layout/ErrorDisplay.jsx";
import ErrorDisplay from "../layout/ErrorDisplay.jsx";
import Loading from "../layout/Loading.jsx";

const ProductList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    // Fetch products
    useEffect(()=> {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const { data: productsData } = await get("/products");
                setProducts(productsData);
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    if (loading) {
        return (
            <Loading />
        )
    }
    if (!error) {
        return (
            <ErrorDisplay />
        )
    }
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
                {
                    products.body?.length === 0 ? (
                        <div>محصولی وجود ندارد</div>
                    ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12
                            gap-x-4"
                        >
                            {products?.body?.map(product=> (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </ul>
                    )
                }
            </div>
        </main>
    )
}
export default ProductList;