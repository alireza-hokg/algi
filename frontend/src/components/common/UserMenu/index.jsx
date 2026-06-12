import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../services/api"
import { useEffect, useRef } from "react";

import "./style.css"
import { useAuth } from "../../../hooks/useAuth";

const UserMenu = ({
    buttonRef,
    isUserDropdown,
    setIsUserDropdown
}) => {
    const dropDownRef = useRef(null);
    const naviagte = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await post("/auth/logout");
            if (response.data.success) {
                naviagte("/auth")
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        const handleClickOutside = (event) => {
            if (buttonRef.current && buttonRef.current.contains(event.target)) {
                return;
            }

            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsUserDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <ul
            ref={dropDownRef}
            className={`user-container absolute top-full bg-gray-100 min-w-30 py-4 p-2 rounded-md ${isUserDropdown ? 
            'flex' : 'hidden'} flex-col gap-y-4 transform translate-x-6/12 translate-y-1/12`}>
            <li>
                <Link
                    
                    className="text-center p-2 rounded-b-sm bg-gray-100"
                >09371036096</Link>
            </li>
            <li>
                <button
                    className="w-full text-center p-2 rounded-b-sm bg-red-400 hover:bg-red-500 
                    cursor-pointer transition-colors duration-300 ease-in-out"
                    onClick={()=> {
                        handleLogout()
                    }}
                >خروج</button>
            </li>
        </ul>
    )
}
export default UserMenu