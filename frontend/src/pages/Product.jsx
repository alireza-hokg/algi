import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../services/api";

import Sylvanas from "../assets/images/download.jpg";
import Screenshot from "../assets/images/screenshot.png";
import Pants from "../components/Product/Pants.jsx";
import Loading from "../components/common/Loading.jsx";
import ErrorDisplay from "../components/common/ErrorDisplay.jsx";

const Product = () => {
    const { slug } = useParams();
    // Product states
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [variantColor, setVariantColor] = useState([]);
    const [variantSize, setVariantSize] = useState([]);
    const [variantWidth, setVariantWidth] = useState([]);
    const [variantHeight, setVariantHeight] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // image state
    const [selectedImage, setSelectedImage] = useState(0);
    const [images, setImages] = useState([]);
    
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: variantsData } = await get(`/products/${slug}/variants`);
            const product_id = variantsData.body[0]?.product_id;
            const { data: productData } = await get(`/products/${product_id}`);
            const variants = variantsData.body || [];
            const product = productData.body || [];
            const uniqueColors = [...new Set(variants.map(product => product.color))];
            const uniqueSizes = [...new Set(variants.map(product => product.size))];
            const uniqueWidth = [...new Set(variants.map(product => product.width))];
            const uniqueHeight = [...new Set(variants.map(product => product.height))];

            setProducts(variants);
            setVariantColor(uniqueColors);
            setVariantSize(uniqueSizes);
            setVariantWidth(uniqueWidth);
            setVariantHeight(uniqueHeight);
            setProduct(product);
        } catch (err) {
            console.log(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setImages([Sylvanas, Screenshot])
        fetchData();
    }, [slug]);

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
        <>
            <main className="container mx-auto px-4 py-8 mt-16">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
                        {/* Product Image Section */}
                        <div className="lg:w-1/2">
                            <div className="mt-16">
                                <div className="bg-gray-100 rounded-2xl overflow-hidden group">
                                    <img
                                        src={images[selectedImage]}
                                        alt={product?.name}
                                        className="w-full min-h-screen object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                {/* Thumbnails - اگر چندتا تصویر داری */}
                                <div className="flex gap-2 mt-4">
                                    {[Sylvanas, Screenshot].map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={()=> {
                                                setSelectedImage(idx)
                                            }}
                                            className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-amber-500 transition-all cursor-pointer">
                                            <img 
                                                src={img} 
                                                alt={`thumbnail ${idx}`} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="lg:w-1/2">
                            {/* Title & SKU */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                                    {product?.name}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <span className="text-sm">کد محصول:</span>
                                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                        {product?.sku}
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-amber-50 rounded-xl p-4 mb-6">
                                <span className="text-gray-600">قیمت:</span>
                                <span className="text-3xl font-bold text-amber-600 mr-2">
                                    {product.price?.toLocaleString("fa-IR")}
                                </span>
                                <span className="text-gray-500 mr-1">تومان</span>
                            </div>

                            {/* Details List */}
                            <div className="space-y-6">
                                {/* Sizes Overview */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-800 mb-3 text-lg">📏 سایزهای موجود:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {variantSize.map((size, index) => (
                                            <span 
                                                key={index}
                                                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-all cursor-pointer"
                                            >
                                                {size}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Variants Details */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-800 mb-4 text-lg">📦 مشخصات دقیق:</h3>
                                    <div className="space-y-3">
                                        {products.map((product) => (
                                            <div 
                                                key={product.id}
                                                className="bg-white rounded-lg p-3 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-bold text-gray-700">سایز {product.size}</span>
                                                    <span className="text-sm text-gray-500">موجود</span>
                                                </div>
                                                <Pants product={product} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Colors */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-bold text-gray-800 mb-3 text-lg">🎨 رنگ‌بندی:</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {variantColor?.map((color, index) => (
                                            <div key={index} className="group">
                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 text-sm hover:border-amber-500 hover:shadow-md transition-all cursor-pointer">
                                                    <span 
                                                        className="w-3 h-3 rounded-full shadow-inner" 
                                                        style={{ backgroundColor: color.toLowerCase() }}
                                                    />
                                                    {color}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                                    افزودن به سبد خرید
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Product;