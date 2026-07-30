import NavigationMenu from "../common/NavigationMenu.jsx";
import SidebarHeader from "../ui/SidebarHeader.jsx";
import { useSidebar } from "../../hooks/useSidebar.js";
import { useAuth } from "../../hooks/useAuth.js";
import { getSidebarTitle } from "../../utils/sidebar.js";

const Sidebar = ({
    onClose,
    isSidebarOpen
}) => {
    const { user } = useAuth();
    const sidebarRef = useSidebar(onClose);

    return(
        <aside
            ref={sidebarRef}
            className={`fixed h-screen top-0 right-0 max-w-xs w-full p-4 shadow-sm bg-[#1a1a1a] 
            text-white overflow-y-auto transform-3d z-30 ${isSidebarOpen ? '' : 'translate-x-full'}
            duration-300 ease-in-out`}
        >
            <SidebarHeader
                title={getSidebarTitle(user?.role)}
            />
            <NavigationMenu
                userRole = {user?.role}
                onClose={onClose}
            />
        </aside>
    )
}
export default Sidebar;