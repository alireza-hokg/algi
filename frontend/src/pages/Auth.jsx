import { useState } from "react";

import AuthLogin from "../components/auth/AuthLogin.jsx";
import AuthRegister from "../components/Auth/AuthRegister.jsx";
import { Link } from "react-router-dom";
import AuthHeader from "../components/layout/AuthHeader.jsx";

const Auth = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState("login");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Phone input accepts just numbers and less than 12 digits
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

    return (
        <div>
            {/* لوگو و لینک‌های ناوبری */}
            <AuthHeader />
            <main className="bg-gray-100 min-h-screen p-0.5">
                {/* فرم لاگین/ثبت‌نام */}
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        <div className="mt-12 mb-6">
                            <h1 className="text-center text-3xl font-bold text-gray-800 mb-2">
                                پوشاک آلگی
                            </h1>
                            <p className="text-center text-gray-500 text-sm">
                                {step === "login" ? "ورود به حساب کاربری" : "عضویت در سایت"}
                            </p>
                        </div>

                        {step === "login" ? (
                            <AuthLogin
                                phone={phone}
                                password={password}
                                onChangePhone={onChangePhone}
                                onChangePassword={onChangePassword}
                                error={error}
                                loading={loading}
                                onToggle={toggleStep}
                            />
                        ) : (
                            <AuthRegister
                                phone={phone}
                                password={password}
                                onChangePhone={onChangePhone}
                                onChangePassword={onChangePassword}
                                error={error}
                                loading={loading}
                                onToggle={toggleStep}
                            />
                        )}
                    </div>
                </div>

                {/* فوتر با لینک‌های اضافی */}
                <footer className="mt-16 text-center text-gray-400 text-sm">
                    <div className="border-t pt-6">
                        <Link to="/terms" className="mx-2 hover:text-amber-600">قوانین</Link>
                        <span>|</span>
                        <Link to="/privacy" className="mx-2 hover:text-amber-600">حریم خصوصی</Link>
                        <span>|</span>
                        <Link to="/faq" className="mx-2 hover:text-amber-600">سوالات متداول</Link>
                    </div>
                    <div className="mt-4">
                        <p>© 2026 پوشاک آلگی. تمام حقوق محفوظ است.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Auth;