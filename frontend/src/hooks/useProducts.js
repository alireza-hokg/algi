
import toast from "react-hot-toast";

import { useEffect, useState } from "react";

import { get, post, put } from "../services/api.js";

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

    const getProduct = async (id) => {
        try {
            const { data } = await get(`/products/${id}`)
            if (data.success) {
                return data.body
            }
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const handleCreateProduct = async (newProduct) => {
        const {price} = newProduct
        const numericPrice = Number(String(price).replace(",", ""));
        const updatedProduct = {
            ...newProduct,
            price: numericPrice,
        };
        console.log(updatedProduct)

        try {
            const { data } = await post("/products", updatedProduct);
            if (data.success) {
                toast.success("محصول با موفقیت ساخته شد.", {
                    duration: 2000,
                    position: "top-center"
                })
            }
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const handleUpdateProduct = async (newProduct, productId) => {
        try {
            const { data } = await put(`/products/${productId}`, newProduct)
            console.log(data)
            if (data.success) {
                return data.body
            }
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
        product,
        setProduct,
        isEmpty: products?.body?.rows?.length,
        handleCreateProduct,
        onChangeProduct,
        getProduct,
        handleUpdateProduct
    }
}