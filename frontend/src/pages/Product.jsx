import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../services/api";
import Header from "../components/layout/Header";
import Sylvanas from "../assets/images/download.jpg"
import Pants from "../components/page-components/Pants";

const Product = () => {
    // Get slug from URL
    const { slug } = useParams();
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [variantColor, setVariantColor] = useState([]);
    const [variantSize, setVariantSize] = useState([]);
    const [variantWidth, setVariantWidth] = useState([]);
    const [variantHeight, setVariantHeight] = useState([]);

    // Fetch products/:slug
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: variantsData} = await get(`/products/${slug}/variants`);
                const product_id = variantsData.body[0]?.product_id;
                const { data: productData } = await get(`/products/${product_id}`)
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
                setProduct(product)
            } catch(err) {
                console.log(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug])

    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    }
    if (error) {
        return (
            <div>{error}</div>
        )
    }
    return(
        <div>
            <Header />
            <main>
                <div className="bg-transparent px-2 mt-14">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* img product */}
                        <div className="flex-1/2">
                            <div>
                                <img
                                    src={Sylvanas}
                                    className="w-full"
                                />
                            </div>
                        </div>
                        {/* details product */}
                        <div className="flex-1/2 px-4 md:px-0 md:text-lg xl:text-xl">
                            {/* name and code */}
                            <h1 className="text-3xl xl:text-4xl text-gray-700 font-bold mb-6 md:mb-8
                                space-x-4">
                                <span>{product?.name}</span>
                                <span>کد {product?.sku}</span>
                            </h1>
                            {/* List of details */}
                            <ul className="space-y-4">
                                <li className="text-2xl">
                                    <span>قیمت:</span>{" "}
                                    <span className="">{product["product.price"]?.toLocaleString("fa-IR")} تومان</span>
                                </li>
                                <li className="flex gap-x-2">
                                    <span className="font-bold">سایزبندی: </span>
                                    <div className="text-gray-700">
                                        {variantSize.map((size, index)=> 
                                            <span key={index}>
                                                {size}{index < variantSize.length -1 && ", "}
                                            </span>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <ul className="">
                                        {products.map((product)=> (
                                            <div 
                                                key={product.id}
                                                className="flex gap-x-3 mb-2 xl:mb-4">
                                                <li>
                                                    <span className="font-bold">سایز </span>
                                                    <span className="text-gray-700">{product.size} :</span>
                                                </li>
                                                {/*  شلوار */}

                                                <Pants 
                                                    key={product.id}
                                                    product={product} 
                                                />
                                            </div>
                                        ))}
                                    </ul>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <span className="font-bold text-gray-800">🎨 رنگ‌ها:</span>
                                    <ul className="flex flex-wrap gap-2">
                                        {variantColor?.map((color, index) => (
                                            <li key={index}>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg text-gray-700 text-xs border border-gray-200">
                                                                    <span 
                                                                        className="w-2 h-2 rounded-full" 
                                                                        style={{ backgroundColor: color.toLowerCase() }}
                                                                    />
                                                    {color}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Product;