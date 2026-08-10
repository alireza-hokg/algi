import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext.js";
import { get, post } from "../services/api.js"

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    
    const logout = async () => {
        setLoading(true);
        try {
            await post("/auth/logout");
        } catch(err) {
            setError(err.message);
            console.log('logout error', err.message)
        } finally {
            setUser(null);
            setIsLogin(false);
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
        <AuthContext.Provider value={{ isLogin, setIsLogin, setUser, user, loading, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider