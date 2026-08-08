import { useEffect, useState } from "react";
import { get } from "../services/api.js";

export const useProduct = (slug) => {
    
    // Product states
    const [product, setProduct] = useState({});
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
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
            // const uniqueSizes = [...new Set(variants.map(product => product.size))];
            // const uniqueWidth = [...new Set(variants.map(product => product.width))];
            // const uniqueHeight = [...new Set(variants.map(product => product.height))];

            setVariants(variants);
            // setVariantSize(uniqueSizes);
            // setVariantWidth(uniqueWidth);
            // setVariantHeight(uniqueHeight);
            setProduct(product);
        } catch (err) {
            console.log(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        fetchProduct();
    }, [slug])
    
    return {
        product,
        variants,
        loading,
        error,
        refetch: fetchProduct
    };
}