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
import ProductImages from "../pages/ProductImages.jsx";
import AllProductsImages from "../pages/AllProductsImages.jsx";
import Compare from "../pages/Compare.jsx";
import Variants from "../pages/admin/Variants.jsx";
import Colors from "../pages/admin/Colors.jsx";
import Cart from "../pages/carts/index.jsx"
import ManagaCustomer from "../pages/admin/ManageCustomer.jsx";

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
                    path="/products/slug/:slug"
                    element={<Product />}
                />
                <Route
                    path="/products-list"
                    element={<Products />}
                />
                <Route
                    path="/products/:id/images"
                    element={<ProductImages />}
                />
                <Route
                    path="/orders"
                    element={<Orders />}
                />
                <Route
                    path="/compare"
                    element={<Compare />}
                />
                <Route
                    path="/carts"
                    element={<Cart />}
                />
            </Route>
            {/* ADMIN */}
            <Route path="/admin" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/transactions" element={<Transactions />} />
                <Route path="/admin/all-products-images" element={<AllProductsImages />} />
                <Route path="/admin/products/slug/:slug/" element={<Variants />} />
                <Route path="/admin/colors" element={<Colors />} />
                <Route path="/admin/manage-customers" element={<ManagaCustomer/>} />
            </Route>
            <Route path="/*" element={<div 
                className="flex justify-center items-center min-h-screen">404</div>}
            />
        </Routes>
    )
}
export default AppRoutes;