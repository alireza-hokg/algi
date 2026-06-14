import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({
    onClose,
    isSidebarOpen
}) => {
    return(
        <aside>
            <div
                className={`fixed top-0 bottom-0 right-0 w-sm p-4 shadow-sm bg-white
                transform-3d z-30 ${isSidebarOpen ? '' : 'translate-x-full'} duration-300 ease-in-out`}
            >
                <div className="flex justify-between border-b pb-2">
                    <h1 className="text-2xl">آلگی</h1>
                    <button
                        className="cursor-pointer bg-gray-100 p-2 rounded-full"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                
                <ul className="flex flex-col gap-y-2 p-2 ">
                    <li>
                        <Link 
                            to={"/auth"}
                            className="block px-2 py-4 cursor-pointer hover:bg-gray-100 rounded-lg"
                        >ثبت نام/ورود</Link>
                    </li>
                    <li>
                        <Link 
                            to={"/auth"}
                            className="block px-2 py-4 cursor-pointer hover:bg-gray-100 rounded-lg"
                        >ثبت نام/ورود</Link>
                    </li>
                    <li>
                        <Link 
                            to={"/auth"}
                            className="block px-2 py-4 cursor-pointer hover:bg-gray-100 rounded-lg"
                        >ثبت نام/ورود</Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
export default Sidebar;