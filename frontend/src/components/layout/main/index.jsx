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
        
        const handleBodyAuto = () => {
            document.body.style.height = "auto"
            document.body.style.overflow = "auto"
        }

        const handleSidebarScroll = () => {
            if (isSidebarOpen) {
                document.body.style.height = "100vh"
                document.body.style.overflow = "hidden"
            } else {
                handleBodyAuto()
            }
        }
        handleSidebarScroll();

        return () => {
            handleBodyAuto();
        }
    }, [isSidebarOpen])
    
    return (
        <div className={`min-h-screen bg-white ${isSidebarOpen ? "overLayer"
        : ""}`}>
            <Sidebar 
                onClose={()=> setIsSidebarOpen(false)}
                isSidebarOpen={isSidebarOpen}
            />
            <Header
                toggleSidebar={toggleSidebar}
            />
            <div className="container mx-auto flex-1 flex flex-col px-4">
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}
export default CustomerLayout;