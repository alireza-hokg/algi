
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "./Sidebar";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev=> !prev)
    }

    return(
        <div className="flex-1 flex flex-col">
            <Sidebar
                onClose={()=> setIsSidebarOpen(false)}
                isSidebarOpen={isSidebarOpen}
            />
            <Header
                toggleSidebar={toggleSidebar}
            />
            <main className="bg-gray-100 flex-1 px-6 flex">
                <Outlet />
            </main>
        </div>
    )
}
export default Layout;