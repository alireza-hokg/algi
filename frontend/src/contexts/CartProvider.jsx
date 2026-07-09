import { useEffect, useState } from "react";
import { CartContext } from "./CartContext.js";
import toast from "react-hot-toast";
import { patch, post } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const CartProvider = ({children}) => {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(()=> {
        const fetchData = async () => {
            const { data: cartsData } = await post("/carts", {
                status: "active"
            });
            const items = cartsData?.body || []
            setCartItems(items);

            const newCount = items.reduce((sum, item) => item.quantity + sum, 0);
            setCartCount(newCount)

            const newTotal = items.reduce((sum, item) => (item.price * item.quantity) + sum, 0)
            setCartTotal(newTotal);
        }
        fetchData();
    }, [])

    // add some product to a user's cart
    const addToCart = async (userId, product, count) => {
        // اگر ثبت نام نکرده
        if (!userId) {
            navigate("/auth");
            toast.custom(
                <div
                    className="bg-linear-to-r from-black to-[#1b1b1b] text-white py-3 px-6 rounded-2xl
                    flex items-center gap-3 text-base font-medium font-sans"
                >
                    <span className="text-xl">🔔</span>
                        لطفا ثبت نام کنید.
                    <span className="text-xl">📝</span>
                </div>,
                {
                    duration: 4000,
                    position: "top-center",
                }
            );
            return
        }
        const cartData = {
            user_id: userId,
            product_id: product.id,
            price: product.price,
            quantity: count,
            status: "active"
        }
        try {
            const { data: createdCart } = await post("/carts/add", cartData)
            if (createdCart.success) {
                setCartItems(prevCartItems => {
                    return prevCartItems.map(item =>
                        item.id === createdCart?.body?.id ? 
                        {...item, quantity: createdCart?.body?.quantity} :
                        item
                    )
                });
                
                setCartCount(prev => prev + count)
                setCartTotal(prev => (product.price * count) + prev)
                toast.success(createdCart.message);
                return createdCart.success
            }
        } 
        catch(err) {
            console.log(err.message)
        }
    }

    const removeFromCart = async (id) => {
        try {
            const isRemoved = await patch(`/carts/${id}`);
            if (isRemoved) {
                toast.success("کالا با موفقیت حذف شد.")
            }
        }
        catch(err) {
            console.log(err.message)
            toast.error(err.message)
        }
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                addToCart,
                removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;