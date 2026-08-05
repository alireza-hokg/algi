
import { useEffect, useState } from "react";

import { get, post } from "../services/api.js";

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        discount: 0,
        discount_price: 0,
        sku: "",
        category_id: ""
    })

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

    const handleCreateProduct = async (product) => {
        const {price} = product
        const numericPrice = Number(String(price).replace(",", ""));

        const updatedProduct = {
            ...product,
            price: numericPrice,
        };

        setProduct(updatedProduct);

        try {
            const createdProduct = await post("/products", product);
            console.log(createdProduct)
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const onChangeProduct = e => {
        const { value, name } = e.target;
        
        setProduct(prevProduct=> ({
            ...prevProduct,
            [name]: value
        }))
    }

    // Fetch products
    useEffect(()=> {
        fetchData();
    }, [])

    return {
        loading,
        setLoading,
        error,
        setError,
        products,
        setProducts,
        isEmpty: products?.body?.rows?.length,
        handleCreateProduct,
        onChangeProduct,
        product,
        setProduct
    }
}