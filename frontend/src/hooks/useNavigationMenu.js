import { useMemo } from "react";
import { useAuth } from "./useAuth"

export const useNavigationMenu = () => {

    const {isLogin} = useAuth();

    const userMenu = useMemo(()=> isLogin ? [
        { path: "/orders", text: "لیست سفارشات", icon: "ShoppingBag" },
        { path: "/profile", text: "اطلاعات کاربر", icon: "User" },
        { path: "/wishlist", text: "علاقه‌مندی‌ها", icon: "Heart" },
        { path: "/logout", text: "خروج", icon: "LogOut", danger: true },
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

    const allMenu = useMemo(()=> {
        return [...mainMenu, ...userMenu, ...guestMenu]
    }, [mainMenu, userMenu, guestMenu])

    const categorizedMenu = useMemo(()=> ({
        main: mainMenu,
        user: userMenu,
        guest: guestMenu
    }), [mainMenu, userMenu, guestMenu]);

    return {
        mainMenu,
        userMenu,
        guestMenu,
        allMenu,
        categorizedMenu
    }
}