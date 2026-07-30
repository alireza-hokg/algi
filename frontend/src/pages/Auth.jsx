import AuthHeader from "../components/layout/AuthHeader.jsx";
import AuthForm from "../components/Auth/AuthForm.jsx";
import { useAuthForm } from "../hooks/useAuthForm.js";
import AuthFooter from "../components/layout/AuthFooter.jsx";

const Auth = () => {
    const authForm = useAuthForm();

    return (
        <div>
            {/* لوگو و لینک‌های ناوبری */}
            <AuthHeader />
            <main className="bg-gray-100 min-h-screen p-0.5">
                {/* فرم لاگین/ثبت‌نام */}
                <div className="container mx-auto px-4">
                    <AuthForm {...authForm}/>
                </div>

                <AuthFooter />
            </main>
        </div>
    );
};

export default Auth;