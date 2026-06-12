import { useState } from "react";

import AuthLogin from "../components/auth/AuthLogin.jsx";
import AuthRegister from "../components/Auth/AuthRegister.jsx";
import { Link } from "react-router-dom";

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
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* لوگو با لینک به صفحه اصلی */}
                        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-2xl font-bold text-amber-600">آلگی</span>
                            <span className="text-sm text-gray-500">پوشاک</span>
                        </Link>

                        {/* لینک‌های ناوبری برای مهمان‌ها */}
                        <div className="flex gap-4">
                            <Link 
                                to="/" 
                                className="text-gray-600 hover:text-amber-600 transition-colors"
                            >
                                صفحه اصلی
                            </Link>
                            <Link 
                                to="/about" 
                                className="text-gray-600 hover:text-amber-600 transition-colors"
                            >
                                درباره ما
                            </Link>
                            <Link
                                to="/contact" 
                                className="text-gray-600 hover:text-amber-600 transition-colors"
                            >
                                تماس با ما
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
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