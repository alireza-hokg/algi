import { toast } from "react-hot-toast";

import { useState } from "react";
import { useEffect } from "react";

import { CartContext } from "./CartContext";
import { del, get, patch, post } from "../services/api.js";
import { useAuth } from "../hooks/useAuth.js";

const CartProvider = ({children}) => {
    const [cart, setCart] = useState();
    const [refresh, setRefresh] = useState(false);
    const { user } = useAuth()
    
    const cartQuantity = cart?.Cart_Items?.reduce((total, item) => {
        return total + item.quantity
    }, 0) || 0;

    // cartItem => { variant_id, quantity }
    const handleAddToCart = async (cartItem) => {
        try {
            const { data } = await post("/carts/items", cartItem);
            if (data.success) {
                setRefresh(prev => !prev)
                return data
            }
        }
        catch(err) {
            toast.error(err.message)
            console.log(err)
        }
    }

    const handleRemoveAllCart = async (cartId) => {
        try {
            const { data: isRemoved } = await del(`/carts/${cartId}`)
            if (isRemoved) {
                setRefresh(prev => !prev)
                return true
            } else {
                return false
            }
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const handleRemoveCart = async (cartId, itemId) => {
        try {
            const { data } = await patch(`/carts/${cartId}/items/${itemId}`);
            if (data.success) {
                setRefresh(prev => !prev)
                return data
            }
        }
        catch(err) {
            toast.error(err.message);
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data: cartData } = await get("/carts/items?status=active");
            setCart(prev => {
                return cartData.body || []
            })
        }
        fetchData()
    }, [user, refresh])

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            handleAddToCart,
            cartQuantity,
            handleRemoveAllCart,
            handleRemoveCart
        }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider