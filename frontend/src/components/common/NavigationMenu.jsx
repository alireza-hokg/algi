import { Link } from "react-router-dom"
import * as Icons from "lucide-react";
import { useNavigationMenu } from "../../hooks/useNavigationMenu.js";

const NavigationMenu = ({
    variant = "sidebar",
    onItemClick = null,
    showIcons = true
}) => {
    const { mainMenu, userMenu } = useNavigationMenu();

    const getIcon = (iconName) => {
        if (!showIcons || !iconName) return null;
        const iconComponent = Icons[iconName];
        return iconComponent ? <iconComponent size={18} /> : null
    }

    const styles = {
        sidebar: {
            container: "space-y-6",
            sectionTitle: "text-amber-500 py-2 border-b border-b-amber-200 font-bold",
            list: "space-y-1",
            link: "flex items-center gap-2 py-2 hover:text-amber-500 duration-300 text-sm",
            dangerLink: "flex items-center gap-2 py-2 hover:text-red-500 duration-300 text-sm text-red-600",
            highlightLink: "flex items-center gap-2 py-2 bg-amber-50 text-amber-600 rounded-lg px-3 hover:bg-amber-100"
        },
        footer: {
            container: "space-y-3",
            sectionTitle: "text-white font-bold mb-2 text-sm",
            list: "space-y-1",
            link: "block text-gray-300 hover:text-white text-sm duration-300",
            dangerLink: "block text-red-400 hover:text-red-300 text-sm",
            highlightLink: "block text-amber-400 hover:text-amber-300 text-sm"
        },
        horizontal: {
            grow: "flex-1",
            container: "hidden md:flex gap-4 flex-wrap justify-center",
            sectionTitle: "hidden",
            list: "flex gap-4",
            link: "text-gray-600 hover:text-amber-500 text-sm duration-300",
            dangerLink: "text-red-600 hover:text-red-700 text-sm",
            highlightLink: "text-amber-600 hover:text-amber-700 text-sm font-medium"
        }
    };

    const currentStyle = styles[variant] || styles.sidebar;

    return (
        <nav className={`py-8 flex-1 ${currentStyle.container}`}>
            
            {variant==="sidebar" ? (
                <div className="border-b border-b-amber-200 my-3 py-1">منو دسترسی ها</div>
            ) : null}
            <ul className={`${currentStyle.list}`}>
                
                {mainMenu.map((item, idx) =>
                    {
                        return (<li key={idx}>
                            <Link
                                to={item.path}
                                className={
                                    currentStyle.link
                                }
                                onClick={() => {
                                    if (item.path === "/logout") {
                                        // handle logout
                                    }
                                    onItemClick?.();
                                }}
                            >
                                {getIcon(item.icon)}
                                {item.text}
                            </Link>
                        </li>)
                    }
                )}
            </ul>

            {variant==="sidebar" ? (
                <div className="border-b border-b-amber-200 my-3 py-1">اطلاعات کاربر</div>
            ) : null}
            <ul className={`${currentStyle.list}`}>
            {userMenu.map((item, idx) =>
                {
                    return (<li key={idx}>
                        <Link
                            to={item.path}
                            className={
                                currentStyle.link
                            }
                            onClick={() => {
                                if (item.path === "/logout") {
                                    // handle logout
                                }
                                onItemClick?.();
                            }}
                        >
                            {getIcon(item.icon)}
                            {item.text}
                        </Link>
                    </li>)
                }
            )}
            </ul>
        </nav>
    )
}
export default NavigationMenu;