import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext.js";
import { post } from "../services/api.js"

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const clearError = () => setError(null);
    const resetPhone = () => {
        setPhone("");
        setPassword("");
        setError(null);
    }

    /** /////////// LOGIN //////////// */
    const handleLogin = async () => {
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
                
                navigate("/");
            }
        } catch(err) {
            console.log(err.message)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    /** ///////// REGISTER ///////// */
    const handleRegister = async () => {
        setLoading(true);
        clearError();
        try {
            const response = await post("auth/register", {
                phoneNumber: phone,
                password
            });
            if (response.data.success) {
                setStep("login");
                setPhone("")
                setPassword("");
            }
        } catch(err) {
            setError(err.message);
            console.log(err.message)
        } finally {
            setLoading(false);
        }
    
    }

    const login = (userData) => {
        setIsLogin(true);
        setUser(userData);
    };

    const logout = () => {
        setIsLogin(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ phone, setPhone, password, setPassword, isLogin, user, loading,
        login, logout, handleLogin, handleRegister}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider