import toast from "react-hot-toast";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { post } from "../services/api.js";
import { isValidPhone } from "../utils/authPhone.js";
import { useAuth } from "./useAuth.js";

export const useAuthForm = () => {
    const { setIsLogin, setUser } = useAuth();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState("login");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onChangePhone = e => {
        let value = e.target.value;
        if (/^\d{0,11}$/.test(value)) {
            setPhone(value)
        }
    }

    const onChangePassword = e => {
        let value = e.target.value;
        setPassword(value);
    }

    const toggleStep = () => {
        setPhone("");
        setPassword("");
        setError("");
        setStep(step === "login" ? "register" : "login");
    };

    const login = (userData) => {
        setIsLogin(true);
        setUser(userData);
    };

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

                toast.success("با موفقیت وارد شدید!", {
                    duration: 2000,
                    position: "top-center"
                });
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 1000);
            }
        } catch(err) {
            console.log(err)
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
                setPhone("");
                setPassword("");
                setStep("login")
            }
        } catch(err) {
            setError(err.message);
            toast.error(err.message || "خطا")
        } finally {
            setLoading(false);
        }
    
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidPhone(phone)) {
            toast.error("شماره موبایل باید با 09 شروع شود و 11 رقم باشد");
            return;
        }

        if (!password || password.length < 6) {
            toast.error("رمز باید حداقب 6 حرف باشد");
            return;
        }
        if (step === "login") {
            await handleLogin(phone, password)
        } else {
            await handleRegister(phone, password)
        }
    }

    return {
        // state
        phone,
        password,
        loading,
        step,
        error,
        // Handlers
        onChangePhone,
        onChangePassword,
        toggleStep,
        handleSubmit,
        // Helpers
        isRegister: step === "register",
        isLogin: step === "login"
    }
}