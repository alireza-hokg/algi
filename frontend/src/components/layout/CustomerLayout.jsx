import { useState } from "react"

import Header from "./Header/index.jsx"
import Sidebar from "./Sidebar.jsx"
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev=> !prev)
    }
    
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar 
                onClose={()=> setIsSidebarOpen(false)}
                isSidebarOpen={isSidebarOpen}
            />
            <div className="flex-1 flex flex-col">
                <Header
                    toggleSidebar={toggleSidebar}
                />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}
export default CustomerLayout;