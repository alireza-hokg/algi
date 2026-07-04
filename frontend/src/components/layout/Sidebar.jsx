import { X } from "lucide-react";
import NavigationMenu from "../common/NavigationMenu";
import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({
    onClose,
    isSidebarOpen
}) => {
    const { user } = useAuth();
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
            className={`fixed h-screen top-0 right-0 max-w-xs w-full p-4 shadow-sm bg-[#1a1a1a] 
            text-white overflow-y-auto transform-3d z-30 ${isSidebarOpen ? '' : 'translate-x-full'}
            duration-300 ease-in-out`}
        >
            <div className="flex justify-between mb-8 mt-2">
                <h1 className="text-3xl">
                    {user?.role === "customer" ? "الگی" : "پنل ادمین"}
                </h1>
                <button
                    className="cursor-pointer p-2 rounded-full"
                    onClick={onClose}
                >
                    <X color="#fb2c36" size={30}/>
                </button>
            </div>
            
            <NavigationMenu
                userRole = {user?.role}
                onClose={onClose}
            />
        </aside>
    )
}
export default Sidebar;