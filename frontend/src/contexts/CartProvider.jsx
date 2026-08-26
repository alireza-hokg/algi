import { toast } from "react-hot-toast";

import { useState } from "react";
import { useEffect } from "react";

import { CartContext } from "./CartContext";
import { get, post } from "../services/api.js";

const CartProvider = ({children}) => {
    const [cart, setCart] = useState();
    
    const cartQuantity = cart?.Cart_Items?.reduce((total, item) => {
        return total + item.quantity
    }, 0) || 0;

    // cartItem => { variant_id, quantity }
    const handleAddToCart = async (cartItem) => {
        try {
            const result = await post("/carts/items", cartItem);
            return result
        }
        catch(err) {
            toast.error(err.message)
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data: cartData } = await get("/carts/items?status=active");
            setCart(prev => {
                return cartData.body
            })

        }
        fetchData()
    }, [])

    
    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            handleAddToCart,
            cartQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider