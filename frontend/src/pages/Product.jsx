import { useParams } from "react-router-dom";

import Loading from "../components/common/Loading.jsx";
import ErrorDisplay from "../components/common/ErrorDisplay.jsx";
import DetailsTab from "../components/ui/product/DetailsTab.jsx";
import CreateProductImage from "../components/ui/CreateProductImage.jsx";
import { useModal } from "../hooks/useModal.js";
import Modal from "../components/common/Modal.jsx";
import ProductQuantity from "../components/ui/product/ProductQuantity.jsx";
import { useProduct } from "../hooks/useProduct.js";
import ProductImages from "../components/ui/product/ProductImages.jsx";

const Product = () => {
    const { slug } = useParams();

    const {
        product,
        loading,
        error
    } = useProduct(slug)

    const { isActive, toggleActive } = useModal();

    {/* ////////// LOADING //////////// */}
    if (loading) {
        return (
            <Loading 
                size="large"
                color="oklch(76.9% 0.188 70.08)"
                fullscreen={true}
            />
        );
    }
    
    {/* ///////////// ERROR ///////////// */}
    if (error) {
        return (
            <ErrorDisplay 
                error={error}
                onRetry={()=> {
                    fetchData()
                }}
                showDetails={true}
            /> 
        );
    }
    
    {/* ////////// Product page //////////// */}
    return (
        <div className="px-6 py-8">
            <div className="bg-white">
                <div
                    className="mb-8"
                >
                    <button
                        className="bg-linear-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-md
                        cursor-pointer"
                        onClick={toggleActive}
                    >
                        ساخت عکس برای محصول
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 pb-10 border-b 
                border-b-gray-300">
                    <ProductImages product_images={product?.Product_Images} />
                    
                    {/* Product Details Section */}
                    <div className="lg:w-1/2 text-center inset-ring inset-ring-gray-100 px-6 py-10
                    rounded-md">
                        {/* Title & SKU */}
                        <div className="border-b border-gray-200 pb-6 mb-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                                {product?.name}
                            </h1>
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <span className="text-sm">کد محصول:</span>
                                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                    {product?.sku}
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-amber-50 rounded-xl p-4 mb-6">
                            <div className="flex justify-center gap-x-4">
                                <span className="line-through decoration-2 text-xl">
                                    {(3000)?.toLocaleString("fa-IR")} تومان
                                </span>
                                <span className="text-3xl font-bold text-amber-600 mr-2">
                                    {product.price?.toLocaleString("fa-IR")}{" "}تومان
                                </span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="space-y-6">
                            {/* Sizes Overview */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-bold text-gray-800 mb-3 text-lg">📏 سایزهای موجود:</h3>
                                <div className="flex justify-center flex-wrap gap-2">
                                    {/* {variantSize.map((size, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1.5 bg-white border border-gray-300 
                                            rounded-lg text-gray-700 text-sm font-medium"
                                        >
                                            {size}
                                        </span>
                                    ))} */}
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <ProductQuantity />
                        </div>
                    </div>
                </div>
                {/* Product Variants Details */}
                <DetailsTab variants={product?.variants} />
            </div>
            {
                isActive ? (
                    <Modal
                        isActive={isActive}
                        toggleActive={toggleActive}
                    >
                        <CreateProductImage product={product} />
                    </Modal>
                ) : null
            }
            
        </div>
    );
};

export default Product;