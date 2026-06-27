import { useMemo } from "react";
import { useAuth } from "./useAuth"

export const useNavigationMenu = () => {

    const {isLogin} = useAuth();

    const customerMenu = useMemo(()=> isLogin ? [
        { path: "/orders", text: "لیست سفارشات", icon: "ShoppingBag" },
        { path: "/profile", text: "پروفایل", icon: "User" },
        { path: "/wishlist", text: "علاقه‌مندی‌ها", icon: "Heart" },
        { path: null, text: "خروج", icon: "LogOut", danger: true },
    ] : [], [isLogin])

    const adminMenu = useMemo(()=> isLogin ? [
        { path: "/products", text: "محصولات", icon: "Shirt" },
        { path: "/profile", text: "پروفایل", icon: "User" },
        { path: "/customers", text: "مشتریان", icon: "BookUser" },
        { path: "/orders", text: "سفارشات", icon: "Handbag"},
        { path: "/transactions", text: "تراکنش ها", icon: "Wallet"},
        { path: null, text: "خروج", icon: "LogOut", danger: true },
    ] : [], [isLogin])

    const mainMenu = useMemo(()=> [
        { path: "/", text: "صفحه اصلی", icon: "Home" },
        { path: "/today-discount", text: "تخفیفات روزانه", icon: "Tag" },
        { path: "/contact-us", text: "تماس با ما", icon: "Phone" },
        { path: "/about-us", text: "درباره ما", icon: "Info" },
    ], [])

    const guestMenu = useMemo(()=> !isLogin ? [
        { path: "/auth", text: "ثبت نام / ورود", icon: "logIn", highlight: true }
    ] : [], [isLogin])

    return {
        mainMenu,
        adminMenu,
        customerMenu,
        guestMenu,
    }
}