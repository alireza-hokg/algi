import { useEffect, useState } from "react";
import { CartContext } from "./CartContext.js";
import toast from "react-hot-toast";
const CartProvider = ({children}) => {

    const [cartItems, setCartItems] = useState(()=> {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : []
    });
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    // بروزرسانی cartItems وقتی cartItems تغییر میکنه
    useEffect(()=> {
        localStorage.setItem("cart", JSON.stringify(cartItems));
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

        const total = savedCart.reduce((sum, item)=> sum + (item.price * item.quantity), 0);
        const count = savedCart.reduce((sum, item)=> sum + item.quantity, 0);

        setCartTotal(total);
        setCartCount(count);

    }, [cartItems])

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems=> {
            const existingItemIndex = prevItems.findIndex(item=> item.id === product.id)
            
            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex].quantity += quantity;
                toast.success(`تعداد ${product.name} به روز شد.`)
                return updatedItems;
            } else {
                toast.success("کالا با موفقیت اضافه شد.");
                return [...prevItems, { ...product, quantity}];
            }
        })
    }

    const removeFromCart = (productId) => {
        setCartItems(prevItems=> {
            const updatedItems = prevItems.filter(item=> item.id !== productId);
            toast.success("کالا با موفقیت حذف شد.")
            return updatedItems
        })
    }

    const increaseQuantity = (productId) => {
        setCartItems(prevItems=> {
            prevItems.map(item=>
                item.id === productId ? 
                    item.quantity +1 :
                    item
            )
        })
    }

    const decreaseQuantity = (productId) => {
        setCartItems(prevItems=> {
            const existingItem = prevItems.find(item=> item.id === productId);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(item=> 
                    item.id === productId ?
                        { ...item, quantity: item.quantity -1}: 
                        item
                )
            } else {
                return prevItems.filter(item=> item.id !== productId)
            }
        })
    }

    const clearCart = () => {
        setCartCount([]);
        toast.success("سبد خرید با موفقیت خالی شد.")
    }
    
    const isInCart = (productId) => {
        return cartItems.some(item=> productId === item.id)
    }

    const getItemQuantity = (productId) => {
        const item = cartItems.find(item=> item.id === productId)
        return item ? item.quantity : 0
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                isInCart,
                getItemQuantity,
            }}
            
        >
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;