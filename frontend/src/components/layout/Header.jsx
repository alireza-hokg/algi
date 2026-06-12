import { ChevronDown, LogIn, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth.js";
import { useRef, useState } from "react";
import UserMenu from "../common/UserMenu/index.jsx";

const Header = ({
    toggleSidebar={toggleSidebar}
}) => {
    const [isUserDropdown, setIsUserDropdown] = useState(false);
    const buttonRef = useRef(null);
    const { isLogin } = useAuth();

    const toggleDropDown = () => {
        setIsUserDropdown(prev=> !prev)
    }

    return (
        <header className="bg-white p-4">
            <div className="">
                <div className="flex justify-between space-x-4">
                    {/* Menu icon */}
                    <button 
                        onClick={toggleSidebar}
                        className="md:hidden bg-orange-500 rounded-full p-2 text-white"
                    >
                        <Menu size={16}/>
                    </button>
                    {/* Brand of the site */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        پوشاک آلگی
                        <img />
                    </h1>
                    {/* Searchbar for width > md */}
                    <div className="hidden md:block flex-1">
                        <div className="hidden md:flex items-center flex-1 max-w-lg lg:max-w-xl border
                        border-gray-300 rounded-4xl
                            ">
                            <input
                                type="text"
                                className="outline-none flex-1 px-2 py-0.5"
                                placeholder="جستجو..."
                            />
                            <i className="px-1">
                                <Search className="text-gray-600" size={16}/>
                            </i>
                        </div>
                    </div>
                    
                    {/* if isLogin = false -> login or sign up for width > md */}
                    {/* OR */}
                    {/* if isLogin = true -> Account info */}
                    <div className="hidden md:block">
                        {console.log(isLogin)}
                        {isLogin ? (
                            <div className="relative">
                                <button
                                    ref={buttonRef}
                                    className="flex p-2 hover:bg-amber-100 rounded-md cursor-pointer"
                                    onClick={()=> {
                                        toggleDropDown()
                                    }}
                                >
                                    <User />
                                    <ChevronDown />
                                </button>
                                <UserMenu
                                    isUserDropdown={isUserDropdown}
                                    setIsUserDropdown={setIsUserDropdown}
                                    buttonRef={buttonRef}
                                />
                            </div>
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
            </div>
        </header>
    )
}

export default Header;