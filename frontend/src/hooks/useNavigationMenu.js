import { useMemo } from "react";
import { useAuth } from "./useAuth"

export const useNavigationMenu = () => {

    const {isLogin} = useAuth();

    const customerMenu = useMemo(()=> isLogin ? [
        { path: "/orders", text: "لیست سفارشات", icon: "ShoppingBag" },
        { path: "/profile", text: "حساب من", icon: "User" },
        { path: "/wishlist", text: "علاقه‌مندی‌ها", icon: "Heart" },
        { path: null, text: "خروج", icon: "LogOut", danger: true },
    ] : [], [isLogin])

    const adminMenu = useMemo(()=> isLogin ? [
        { path: "/profile", text: "حساب من", icon: "User" },
        { path: "/admin/manage-customers", text: "مدیریت مشتریان", icon: "BookUser" },
        { path: "/admin/orders", text: "مدیریت سفارشات", icon: "ShoppingBag"},
        { path: "/admin/transactions", text: "مدیریت تراکنش ها", icon: "Wallet"},
        { path: "/admin/colors", text: "مدیریت رنگ ها", icon: "Palette" },
        { path: "/admin", text: "داشبورد", icon: "UserStar"},
        { path: null, text: "خروج", icon: "LogOut", danger: true },
    ] : [], [isLogin])

    const mainMenu = useMemo(()=> [
        { path: "/", text: "صفحه اصلی", icon: "Home" },
        { path: "/products-list", text: "محصولات", icon: "Box"},
        { path: "/today-discount", text: "تخفیفات روزانه", icon: "Tag" },
        { path: "/contact-us", text: "ارتباط با ما", icon: "Phone" },
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