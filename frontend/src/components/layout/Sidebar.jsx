import { X } from "lucide-react";
import NavigationMenu from "../common/NavigationMenu";
import { useEffect, useRef } from "react";

const Sidebar = ({
    onClose,
    isSidebarOpen
}) => {

    const sidebarRef = useRef();

    useEffect(()=> {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && sidebarRef.current.contains(e.target)) {
                return
            }

            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                onClose();
            }
        }

        const handleKeyOutside = (e) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", handleKeyOutside);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleKeyOutside)
        }
    }, [])

    return(
        <aside
            ref={sidebarRef}
            className={`fixed h-screen top-0 right-0 max-w-xs w-full p-4 shadow-sm bg-white 
            overflow-y-auto transform-3d z-30 ${isSidebarOpen ? '' : 'translate-x-full'} duration-300 
            ease-in-out`}
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