import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom";

import Header from "../Header/index.jsx"
import Sidebar from "../Sidebar.jsx"
import Footer from "../Footer.jsx";

import "./style.css"

const CustomerLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev=> !prev)
    }

    useEffect(()=> {
        const handleSidebarScroll = () => {
            if (isSidebarOpen) {
                document.body.style.height = "100vh"
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.height = "auto"
                document.body.style.overflow = "auto"
            }
        }
        handleSidebarScroll();
    }, [isSidebarOpen])
    
    return (
        <div className={`min-h-screen bg-gray-50 flex ${isSidebarOpen ? "overLayer"
        : ""}`}>
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