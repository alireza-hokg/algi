import { Routes, Route, useLocation } from "react-router-dom"
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Product from "../pages/Product";
import Admin from "../pages/Admin";

const AppRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route 
                path="/" 
                element={<Home />}
            />
            <Route
                path="/auth"
                element={<Auth />}
            />
            <Route
                path="/products/:slug/variants"
                element={<Product />}
            />
            <Route
                path="/admin/"
                element={<Admin />}
            />
        </Routes>
    )
}
export default AppRoutes;