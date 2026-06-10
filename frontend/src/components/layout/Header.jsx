import { LogIn, Menu, Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

const Header = () => {
    const { isLogin } = useAuth();
    return (
        <header className="bg-white p-4">
            <div className="">
                <div className="flex justify-between space-x-4">
                    {/* Menu icon */}
                    <div className="md:hidden bg-orange-500 rounded-full p-2 text-white">
                        <i>
                            <Menu size={16}/>
                        </i>
                    </div>
                    {/* Brand of the site */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        پوشاک آلگی
                        <img />
                    </h1>
                    {/* Search bigger than medium width */}
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
                    {/* Login or sign up for bigger than medium width */}
                    {isLogin ? (
                        null
                    ) : (
                        <div className="hidden md:block">
                            <Link
                                to="/auth"
                                className="flex text-white bg-orange-500 py-1 px-4 rounded-lg whitespace-nowrap">
                                <i><LogIn /></i>
                                <span>ورود | ثبت نام</span>
                            </Link>
                        </div>
                    )}
                    {/* Search and basket icon for less than medium width */}
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