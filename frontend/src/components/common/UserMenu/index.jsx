import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../services/api";
import { useEffect, useRef } from "react";

import "./style.css";
import { ChevronDown, User } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

const UserMenu = ({ buttonRef, isUserDropdown, setIsUserDropdown }) => {
  const dropDownRef = useRef(null);
  const naviagte = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await post("/auth/logout");
      if (response.data.success) {
        naviagte("/auth");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDropDown = () => {
    setIsUserDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }

      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex p-2 hover:bg-amber-500 rounded-md cursor-pointer"
        onClick={() => {
          toggleDropDown();
        }}
      >
        <User />
        <ChevronDown />
      </button>
      <ul
        ref={dropDownRef}
        className={`user-container absolute top-full bg-[#1b1b1b] min-w-30 py-4 p-2 rounded-md ${
          isUserDropdown ? "flex" : "hidden"
        } flex-col gap-y-4 transform translate-x-6/12 translate-y-1/12`}
      >
        <li className="border-b border-b-white">
          <Link className="block text-center p-2 rounded-b-sm hover:bg-[#1b1b1b]">
            09371036096
          </Link>
        </li>
        {user?.role === "admin" ? (
            <li>
                <Link
                    className="block text-center p-2 rounded-b-sm hover:bg-[#1b1b1b]"
                    to={"/admin"}
                >
                    داشبورد
                </Link>
            </li>
        ) : null}
        <li>
          <button
            className="w-full text-center p-2 rounded-b-sm bg-red-400 hover:bg-red-500 
            cursor-pointer transition-colors duration-300 ease-in-out"
            onClick={() => {
              handleLogout();
            }}
          >
            خروج
          </button>
        </li>
      </ul>
    </div>
  );
};
export default UserMenu;
