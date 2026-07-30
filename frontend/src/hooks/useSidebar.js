import { useEffect, useRef } from "react";

export const useSidebar = (onClose) => {
    const sidebarRef = useRef(null);

    useEffect(()=> {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && sidebarRef.current.contains(e.target)) {
                return
            }

            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                onClose();
            }
        }

        const handleKeyOutside = (e) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", handleKeyOutside);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleKeyOutside)
        }
    }, [onClose])
    return sidebarRef;
}