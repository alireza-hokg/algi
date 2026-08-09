import { useEffect, useState } from "react"
import { get, del } from "../services/api.js"

export const useProductImages = (id) => {
    const [product, setProduct] = useState({});

    const handleDeleteImage = async (imageId) => {
        const deletedImage = await del(`/product-images/${imageId}`)
        console.log(deletedImage)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data: productData } = await get(`products/${id}`);
            if (productData.success) {
                setProduct(productData.body);
                console.log(productData)
            }
        }
        fetchData()
    }, [])
    return {
        product,
        setProduct,
        handleDeleteImage
    }
}