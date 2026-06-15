import { useMemo } from "react";
import { useAuth } from "./useAuth"
import { Home,  } from "lucide-react";

export const useNavigationMenu = () => {

    const {isLogin} = useAuth();

    const customerMenu = useMemo(()=> isLogin ? [
        { path: "/orders", text: "لیست سفارشات", icon: "ShoppingBag" },
        { path: "/profile", text: "پروفایل", icon: "User" },
        { path: "/wishlist", text: "علاقه‌مندی‌ها", icon: "Heart" },
        { path: null, text: "خروج", icon: "LogOut", danger: true },
    ] : [], [isLogin])

    const adminMenu = useMemo(()=> isLogin ? [
        { path: "/orders", text: "لیست سفارشات", icon: "ShoppingBag" },
        { path: "/profile", text: "پروفایل", icon: "User" },
        { path: "/wishlist", text: "علاقه‌مندی‌ها", icon: "Heart" },
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

    // const allMenu = useMemo(()=> {
    //     return [...mainMenu, ...customerMenu, ...guestMenu]
    // }, [mainMenu, customerMenu, guestMenu, adminMenu])

    // const categorizedMenu = useMemo(()=> ({
    //     main: mainMenu,
    //     user: customerMenu,
    //     guest: guestMenu,
    //     admin: adminMenu
    // }), [mainMenu, customerMenu, guestMenu, adminMenu]);

    return {
        mainMenu,
        adminMenu,
        customerMenu,
        guestMenu,
    }
}