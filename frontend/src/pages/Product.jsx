import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "../services/api";

import Sylvanas from "../assets/images/download.jpg";
import Screenshot from "../assets/images/screenshot.png";
import Loading from "../components/common/Loading.jsx";
import ErrorDisplay from "../components/common/ErrorDisplay.jsx";
import DetailsTab from "../components/product/DetailsTab.jsx";
import CreateProductImage from "../components/ui/CreateProductImage.jsx";

const Product = () => {
    const { slug } = useParams();

    // Product states
    const [product, setProduct] = useState({});
    const [variants, setVariants] = useState([]);
    const [variantSize, setVariantSize] = useState([]);
    const [variantWidth, setVariantWidth] = useState([]);
    const [variantHeight, setVariantHeight] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // image state
    const [selectedImage, setSelectedImage] = useState(0);
    const [images, setImages] = useState([]);

    const [count, setCount] = useState(1);

    const decreaseCount = () => {
        if (count<=1) {
            setCount(1)
        } else {
            setCount(count=> count-1)
        }
    }

    const increaseCount = () => {
        setCount(count=> +count+1)
    }

    const onChangeCount = (e) => {
        const value = e.target.value;
        if (isNaN(value) || value<1) {
            setCount(1)
            return
        }
        setCount(value)
    }

    const handleAddToCart = async () => {
        if (count===0) {
            return
        }
    }

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // ویژگی های محصول مثل طول و سایز 
            const { data: variantsData } = await get(`/products/${slug}/variants`);
            const product_id = variantsData?.body[0]?.product_id;
            // خود محصول مثلا قیمت
            const { data: productData } = await get(`/products/${product_id}`);
            const variants = variantsData.body || [];
            const product = productData.body || [];
            const uniqueSizes = [...new Set(variants.map(product => product.size))];
            const uniqueWidth = [...new Set(variants.map(product => product.width))];
            const uniqueHeight = [...new Set(variants.map(product => product.height))];

            setVariants(variants);
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
        <div className="px-6 py-8">
            <div className="bg-white">
                <CreateProductImage product={product} />

                <div className="flex flex-col lg:flex-row gap-8 pb-10 border-b 
                border-b-gray-300">
                    {/* Product Image Section */}
                    <div className="lg:w-1/2 lg:relative">
                        <div className="lg:sticky lg:top-8">
                            <div className="bg-gray-100 rounded-2xl overflow-hidden group max-h-8/12">
                                <img
                                    src={images[selectedImage]}
                                    alt={product?.name}
                                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                                    {variantSize.map((size, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1.5 bg-white border border-gray-300 
                                            rounded-lg text-gray-700 text-sm font-medium"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <div className="flex items-center gap-x-4">
                                <div className="flex-0 flex text-2xl">
                                    <button 
                                        className={`p-2 rounded-2xl border-2 border-gray-200 hover:bg-amber-500
                                        hover:border-amber-500 hover:text-white cursor-pointer
                                        ${count===0 ? "opacity-50 cursor-grab hover:border-gray-200" : null}`}
                                        onClick={decreaseCount}
                                        disabled={count <= 1 ? true : false}
                                    >-</button>
                                    <input
                                        type="number"
                                        value={count}
                                        onChange={onChangeCount}
                                        className="focus:outline-0 border-y max-w-20 min-w-12 text-center"
                                    />
                                    <button
                                        className="p-2 rounded-2xl border-2 border-gray-200 hover:bg-amber-500
                                        hover:border-amber-500 hover:text-white cursor-pointer"
                                        onClick={increaseCount}
                                    >+</button>
                                </div>
                                <button
                                    className="flex-1 bg-amber-500 hover:bg-black 
                                    text-white font-bold py-4 rounded-xl cursor-pointer transition-all 
                                    duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                >
                                    افزودن به سبد خرید
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Product Variants Details */}
                <div className="">
                    <DetailsTab variants={variants} />
                </div>
            </div>
        </div>
    );
};

export default Product;