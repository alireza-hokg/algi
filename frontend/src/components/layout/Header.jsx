import { LogIn, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white p-4">
            <div className="">
                <div className="flex justify-between">
                    <div>
                    algi
                        <img />
                    </div>
                    <div className="flex items-center flex-1 max-w-lg border rounded-lg">
                        <input
                            type="text"
                            className="outline-none flex-1 p-2"
                            placeholder="نام محصول را جستجو کنید"
                        />
                        <i className="px-2">
                            <Search />
                        </i>
                    </div>
                    <div>
                        <Link
                            to="/al"
                            className="flex text-white bg-orange-500 py-2 px-4 rounded-lg">
                            <i><LogIn /></i>
                            <span>ورود | ثبت نام</span>
                        </Link>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </header>
    )
}

export default Header;