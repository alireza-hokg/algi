import { useEffect, useState } from "react";
import { get } from "../services/api.js";

export const useProduct = (slug) => {
    // Product states
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data: productData } = await get(`products/slug/${slug}`);
            setProduct(productData?.body)
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
        loading,
        error,
        refetch: fetchProduct
    };
}