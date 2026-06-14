import { X } from "lucide-react";
import NavigationMenu from "../common/NavigationMenu";

const Sidebar = ({
    onClose,
    isSidebarOpen
}) => {

    return(
        <aside
            className={`fixed h-screen right-0 max-w-xs w-full p-4 shadow-sm bg-white scroll-auto
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
            
            <NavigationMenu />
        </aside>
    )
}
export default Sidebar;