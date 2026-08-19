import { useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({children}) => {
    const [cart, setCart] = useState()
    return (
        <CartContext.Provider value={{

        }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider