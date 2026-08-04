import { Routes, Route, useLocation } from "react-router-dom"
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Product from "../pages/Product";
import GuestRoute from "../components/common/GuestRoute";
import Dashboard from "../pages/admin/Dashboard.jsx";
import Layout from "../components/layout/main/";
import Orders from "../pages/orders.jsx";
import AdminOrders from "../pages/admin/Orders.jsx";
import Transactions from "../pages/admin/Transactions.jsx";
// import Carts from "../pages/carts/";
import Products from "../pages/Products.jsx";

const AppRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            {/** If user isLogin = false then can not access /auth
            */}
            <Route
                path="/auth"
                element={
                    <GuestRoute>
                        <Auth />
                    </GuestRoute>
                }
            />
            {/* CUTSOMER */}
            <Route path="/" element={<Layout />}>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/products/:slug/variants"
                    element={<Product />}
                />
                <Route
                    path="/products-list"
                    element={<Products />}
                />
                {/* <Route
                    path="/carts"
                    element={<Carts />}
                /> */}
                <Route
                    path="/orders"
                    element={<Orders />}
                />
            </Route>
            {/* ADMIN */}
            <Route path="/admin" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="transactions" element={<Transactions />} />
            </Route>
            <Route path="/*" element={<div 
                className="flex justify-center items-center min-h-screen">404</div>}
            />
        </Routes>
    )
}
export default AppRoutes;