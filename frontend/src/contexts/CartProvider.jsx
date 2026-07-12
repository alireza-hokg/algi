import { useEffect, useState } from "react";
import { CartContext } from "./CartContext.js";
import toast from "react-hot-toast";
import { patch, post } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const CartProvider = ({children}) => {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    const { user } = useAuth();

    useEffect(()=> {
        const fetchData = async () => {
            let items;
            if (!user) {
                items = []
                setCartItems(items)
            }
            else {
                const { data: cartsData } = await post("/carts", {
                    status: "active"
                });
                items = cartsData?.body || []
                setCartItems(items);
            }

            const newCount = items.reduce((sum, item) => item.quantity + sum, 0);
            setCartCount(newCount)

            const newTotal = items.reduce((sum, item) => (item.price * item.quantity) + sum, 0)
            setCartTotal(newTotal);
        }
        fetchData();
    }, [user])

    // add some product to a user's cart
    const addToCart = async (product, count) => {
        // اگر ثبت نام نکرده
        if (!user) {
            navigate("/auth");
            toast.custom(
                <div
                    className="bg-black/60 backdrop-blur-3xl text-white py-3 px-6 rounded-2xl
                    flex items-center gap-3 text-base font-medium font-sans border border-blue-500/90
                    shadow-md shadow-blue-500/20"
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
            return false;
        }
        // user رو از userProvider میگیریم
        const cartData = {
            user_id: user.id,
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
                return createdCart
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