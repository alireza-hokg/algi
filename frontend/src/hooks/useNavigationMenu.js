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
        { path: "/admin/products-list", text: "مدیریت محصولات", icon: "Box" },
        { path: "/admin/profile", text: "پروفایل", icon: "User" },
        { path: "/admin/customers", text: "مشتریان", icon: "BookUser" },
        { path: "/admin/orders", text: "مدیریت سفارشات", icon: "ShoppingBag"},
        { path: "/admin/transactions", text: "مدیریت تراکنش ها", icon: "Wallet"},
        { path: "/admin/all-products-images", text: "عکس های محصولات", icon: "Image"},
        { path: "/admin", text: "داشبورد", icon: "UserStar"},
        { path: null, text: "خروج", icon: "LogOut", danger: true },
    ] : [], [isLogin])

    const mainMenu = useMemo(()=> [
        { path: "/", text: "صفحه اصلی", icon: "Home" },
        { path: "/products-list", text: "محصولات", icon: "Box"},
        { path: "/today-discount", text: "تخفیفات روزانه", icon: "Tag" },
        { path: "/contact-us", text: "ارتباط با ما", icon: "Phone" },
        { path: "/about-us", text: "درباره ما", icon: "Info" },
        { path: "/follow-up-order", text: "پیگیری سفارش", icon: "PackageSearch"}
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