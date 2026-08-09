import { useEffect } from "react";
import { useState } from "react"

export const useModal = () => {
    const [isActive, setIsActive] = useState(false);
    const [modalType, setModalType] = useState(null);

    const toggleActive = () => {
        setIsActive(prev => !prev)
    }

    useEffect(()=> {
        if (!isActive) return;
        
        const handleKeyDown = e => {
            if (e.key === "Escape") {
                setIsActive(false)
            }
        }
        
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isActive])

    return {
        isActive,
        setIsActive,
        toggleActive,
        modalType,
        setModalType
    }
}