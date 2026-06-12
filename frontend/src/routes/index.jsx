import { Routes, Route, useLocation } from "react-router-dom"
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Product from "../pages/Product";
import ProtectedRoute from "../components/common/ProtectedRoute";
import GuestRoute from "../components/common/GuestRoute";
import CustomerLayout from "../components/layout/CustomerLayout.jsx";

const AppRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route
                path="/auth"
                element={
                    <GuestRoute>
                        <Auth />
                    </GuestRoute>
                }
            />
            {/* CUTSOMER */}
            <Route path="/" element={<CustomerLayout />}>
                <Route
                    path="/" 
                    element={<Home />}
                />
                <Route
                    path="/products/:slug/variants"
                    element={<Product />}
                />
            </Route>
            {/* ADMIN */}
            <Route path="/admin" element={
                <ProtectedRoute>
                    
                </ProtectedRoute>
            }>
                
            </Route>
            <Route path="*" element={<div 
                className="flex justify-center items-center min-h-screen">404</div>}
            />
        </Routes>
    )
}
export default AppRoutes;