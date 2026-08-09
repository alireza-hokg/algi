import { useEffect, useState } from "react"
import { get } from "../services/api.js"

export const useProductImages = (id) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const { data: productData } = await get(`products/${id}`);
            if (productData.success) {
                setProduct(productData.body);
            }
        }
        fetchData()
    }, [])
    return {
        product,
        setProduct,
    }
}