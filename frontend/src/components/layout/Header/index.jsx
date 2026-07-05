import { LogIn, Menu, Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth.js";
import { useRef, useState } from "react";
import UserMenu from "../../common/UserMenu/index.jsx";

import "./style.css"
import { useCart } from "../../../hooks/useCart.js";

const Header = ({
    toggleSidebar={toggleSidebar}
}) => {

    const [isUserDropdown, setIsUserDropdown] = useState(false);
    const buttonRef = useRef(null);
    const { isLogin } = useAuth();
    const { cartCount, cartTotal } = useCart();

    return (
        <header className="py-8 px-4 bg-black text-white">
            <div className="container mx-auto flex justify-between items-center gap-x-6">
                {/* Menu icon */}
                <button 
                    onClick={toggleSidebar}
                    className="rounded-full p-2 hover:cursor-pointer"
                >
                    <Menu size={24}/>
                </button>
                {/* Brand of the site */}
                <div className="flex-1 flex items-center justify-center gap-x-8">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        پوشاک آلگی
                        <img />
                    </h1>
                </div>
                
                
                {/* if isLogin = false -> login or sign up for width > md */}
                {/* OR */}
                {/* if isLogin = true -> Account info */}
                <div className="hidden md:block">
                    {isLogin ? (
                        <UserMenu
                            isUserDropdown={isUserDropdown}
                            setIsUserDropdown={setIsUserDropdown}
                            buttonRef={buttonRef}
                        />
                    ) : (
                        <Link
                            to="/auth"
                            className="flex text-white bg-orange-500 py-1 px-4 rounded-lg whitespace-nowrap">
                            <i><LogIn /></i>
                            <span>ورود | ثبت نام</span>
                        </Link>
                    )}
                </div>
                {/* Search and basket icon for width < md */}
                <div className="flex space-x-4">
                    <div>
                        <Search color="#666"/>
                    </div>
                    <Link
                        to={`/orders`}
                        className="flex gap-x-2 relative text-[#666] hover:text-white cursor-pointer duration-150
                        ease-in-out"
                    >
                        <div className="">
                            {cartCount === 0 ? null : (
                                <div
                                    className="flex justify-center items-center absolute bottom-8/12 right-8/12
                                    bg-amber-500 rounded-full py-0.5 px-1.5 text-white"
                                >
                                        <span className="text-[10px] font-bold">
                                            {cartCount}
                                        </span>
                                </div>
                            )}
                            <ShoppingBag />
                        </div>
                        <span>{(cartTotal).toLocaleString("fa-IR")}{" "}تومان</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;