import { Link } from "react-router-dom"
import * as Icons from "lucide-react";
import { useNavigationMenu } from "../../hooks/useNavigationMenu.js";
import { useAuth } from "../../hooks/useAuth.js";
import React from "react";

const NavigationMenu = ({
    onClose=null,
    userRole=null
}) => {

    const { mainMenu, customerMenu, adminMenu } = useNavigationMenu();
    const { logout } = useAuth();

    const getIcon = (iconName) => {
        if (!iconName) return null;
        const IconComponent = Icons[iconName];
        return React.createElement(IconComponent, { size: 18 });
    }

    return (
        <nav className="flex-1 space-y-6 py-6">
            
            <div className="text-amber-600 py-2 border-b border-b-white font-bold">منو دسترسی ها</div>
            
            <ul className="space-y-1">

                {mainMenu.map((item, idx) =>
                    {
                        return (<li key={idx}>
                            <Link
                                to={item.path}
                                className="flex items-center gap-2 py-2 hover:text-amber-500 duration-300
                                text-sm"
                                onClick={()=> {
                                    onClose?.();
                                }}
                            >
                                {getIcon(item.icon)}
                                {item.text}
                            </Link>
                        </li>)
                    }
                )}
            </ul>

            <>
                <div className="text-amber-600 py-2 border-b border-b-white font-bold">اطلاعات کاربر</div>
                <ul className="space-y-1">
                    {userRole === null ? (
                        <div className="space-y-1">
                            <Link 
                                className="flex items-center gap-2 py-2 hover:text-amber-500 duration-300 
                                text-sm"
                                to={"/auth"}>ثبت نام / ورود</Link>
                        </div>
                    ) : userRole === "customer" ?
                        customerMenu.map((item, idx) =>
                            {
                                return (<li key={idx}>
                                    <Link
                                        to={item.path}
                                        className="flex items-center gap-2 py-2 hover:text-amber-500
                                        duration-300 text-sm"
                                        onClick={() => {
                                            onClose?.();
                                            if (item.path === null) {
                                                logout();
                                            }
                                        }}
                                    >
                                        {getIcon(item.icon)}
                                        {item.text}
                                    </Link>
                                </li>)
                            }
                        ) : userRole === "admin" &&
                        adminMenu?.map((item, idx) =>
                            {
                                return (<li key={idx}>
                                    <Link
                                        to={item.path}
                                        className="flex items-center gap-2 py-2 hover:text-amber-500 duration-300
                                        text-sm"
                                        onClick={() => {
                                            onClose?.();
                                            if (item.path === null) {
                                                logout();
                                            }
                                        }}
                                    >
                                        {getIcon(item.icon)}
                                        {item.text}
                                    </Link>
                                </li>)
                            }
                        )
                    }
                    
                </ul>
            </>
        </nav>
    )
}
export default NavigationMenu;