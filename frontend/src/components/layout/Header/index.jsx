import { LogIn, Menu, Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth.js";
import { useRef, useState } from "react";
import UserMenu from "../../common/UserMenu/index.jsx";

import "./style.css"
import NavigationMenu from "../../common/NavigationMenu.jsx";

const Header = ({
    toggleSidebar={toggleSidebar}
}) => {
    const [isUserDropdown, setIsUserDropdown] = useState(false);
    const buttonRef = useRef(null);
    const { isLogin } = useAuth();

    return (
        <header className="py-8 px-6">
            <div className="flex justify-between items-center space-x-4">
                {/* Menu icon */}
                <button 
                    onClick={toggleSidebar}
                    className="md:hidden bg-orange-500 rounded-full p-2 text-white"
                >
                    <Menu size={16}/>
                </button>
                {/* Brand of the site */}
                <div className="flex-1 flex items-center gap-x-8">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        پوشاک آلگی
                        <img />
                    </h1>
                    {/* <div className="hidden md:block"> */}
                        <NavigationMenu
                            variant="horizontal"
                        />
                    {/* </div> */}
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
                <div className="flex md:hidden space-x-2">
                    <div>
                        <Search color="#666"/>
                    </div>
                    <div>
                        <ShoppingBag color="#666"/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;