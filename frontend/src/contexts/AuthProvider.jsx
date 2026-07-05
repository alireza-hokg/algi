import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthContext } from "./AuthContext.js";
import { get, post } from "../services/api.js"

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const clearError = () => setError(null);

    /** /////////// LOGIN //////////// */
    const handleLogin = async (phone, password) => {
        setLoading(true);
        clearError();
        try {
            const response = await post("auth/login", {
                phoneNumber: phone,
                password
            })
            
            if (response.data.success) {
                // فرض می‌کنیم توکن و دیتای کاربر در response.data موجود است
                const { user } = response.data.body;
                // استفاده از تابع login از Context
                login(user);

                toast.success("با موفقیت وارد شدید!");
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 1000);
            }
        } catch(err) {
            toast.error(err.response.data.message || "خطا در ورود")
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    /** ///////// REGISTER ///////// */
    const handleRegister = async (phone, password) => {
        setLoading(true);
        clearError();
        try {
            const response = await post("auth/register", {
                phoneNumber: phone,
                password
            });
            if (response.data.success) {
                toast.success("با موفقیت ثبت نام شدید!", {
                    duration: 2000, // مدت زمان نمایش
                    position: "top-center",
                });
            }
        } catch(err) {
            setError(err.message);
            toast.error(err.message || "خطا")
        } finally {
            setLoading(false);
        }
    
    }

    const login = (userData) => {
        setIsLogin(true);
        setUser(userData);
    };

    const logout = async () => {
        setLoading(true);
        try {
            await post("/auth/logout");
        } catch(err) {
            setError(err.message);
            console.log('logout error', err.message)
        } finally {
            setIsLogin(false);
            setUser(null);
            setLoading(false);
            navigate("/auth", { replace: true });
        }
    };

    useEffect(()=> {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const response = await get("/auth/me");
                if (response.data && response.data.success === true) {
                    setIsLogin(true);
                    setUser(response.data.body);
                } else {
                    setIsLogin(false);
                    setUser(null);
                }
            } catch(err) {
                setIsLogin(false);
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
        
        const handleUnauthorized = () => {
            logout();
        }
        window.addEventListener("unauthorized", handleUnauthorized);
        return () => window.removeEventListener("unauthorized", handleUnauthorized);

    }, [location.pathname])

    return (
        <AuthContext.Provider value={{ isLogin, user, loading, login, logout, handleLogin, 
        handleRegister}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider