import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../services/api";
import Header from "../components/layout/Header";
import Sylvanas from "../assets/images/download.jpg"

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
                const { data: productVariantsData} = await get(`/products/${slug}/product-variants`);
                const { products } = productVariantsData.body;
                const uniqueColors = [...new Set(products.map(product => product.color))];
                const uniqueSizes = [...new Set(products.map(product => product.size))];
                const uniqueWidth = [...new Set(products.map(product => product.width))];
                const uniqueHeight = [...new Set(products.map(product => product.height))];

                setProducts(products);
                setVariantColor(uniqueColors);
                setVariantSize(uniqueSizes);
                setVariantWidth(uniqueWidth);
                setVariantHeight(uniqueHeight);
                setProduct(products[0])
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
                            <h1 className="text-3xl xl:text-4xl text-gray-700 font-bold mb-6 md:mb-8">
                                {slug}
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
                                            <span>
                                                {size}{index < variantSize.length -1 && ", "}
                                            </span>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <ul className="">
                                        {products.map(product=> (
                                            <div className="flex gap-x-3 mb-2 xl:mb-4">
                                                <li>
                                                    <span className="font-bold">سایز </span>
                                                    <span className="text-gray-700">{product.size} :</span>
                                                </li>
                                                <div className="flex gap-x-3">
                                                    {product.height ? (
                                                        <li>
                                                            <span className="font-bold">قد: </span>
                                                            <span className="text-gray-700">{product.height} سانتی متر</span>
                                                        </li>
                                                    ) : null}
                                                    {product.waist ? (
                                                        <li>
                                                            <span className="font-bold">دور کمر: </span>
                                                            <span className="text-gray-700">{product.waist}</span>
                                                        </li>
                                                    ) : null}
                                                    {product.width ? (
                                                        <li>
                                                            <span className="font-bold">عرض: </span>
                                                            <span className="text-gray-700">{product.width}</span>
                                                        </li>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <span>رنگ بندی: </span>
                                    <ul className="inline-flex gap-x-2">
                                        {variantColor?.map((color, index)=> (
                                            <li 
                                                className=""
                                            >
                                                <span>
                                                    {color}{index < variantColor.length -1 && "، "}
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