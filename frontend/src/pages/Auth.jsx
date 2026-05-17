import { useState } from "react";
import AuthPhone from "../components/page-components/AuthPhone";
import { post } from "../services/api";
import AuthLogin from "../components/page-components/AuthLogin";
import AuthRegister from "../components/page-components/AuthRegister";
import { useNavigate } from "react-router-dom"

const Auth = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("phone");
    // Check user is registered or not
    const sendPhone = async (phoneNumber) => {
        setLoading(true);
        setError("");
        try {
            const response = await post("/auth/send-otp", { phoneNumber });

            if (response.data.success && response.data.flow === "login") {
                setPhone(phoneNumber);
                setStep("login")
            } else if (response.data.success && response.data.flow === "register") {
                setPhone(phoneNumber);
                setStep("register")

            } else {
                setError(response.data.message);
            }
        } catch(err) {
            console.log(err.response?.data?.message || "خطا در ارسال شماره")
        } finally {
            setLoading(false);
        }
    }
    // Enter password and login
    const verifyLogin = async (password) => {
        setLoading(true);
        setError("");
        try {
            const response = await post("auth/login", {
                phoneNumber: phone,
                password
            })
            if (response.data.success) {
                navigate("/")
            }
        } catch(err) {
            console.log(err.message)
        } finally {
            setLoading(false);
        }
    }

    // Enter OTP and create a password
    const verifyRegister = async (code, password) => {
        setLoading(true);
        setError("");
        try {
            const response = await post("/auth/register", {
                phoneNumber: phone,
                password,
                code
            })
            if (response.data.success) {
                navigate("/")
            }
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <main>
            <div className="bg-gray-100 min-h-screen p-0.5">
                <div className="mt-20 mb-6">
                    <h1 className="text-center text-4xl flex-1 mb-8">پوشاک آلگی</h1>
                    {
                        step === "phone" ? (
                            <AuthPhone 
                                onSubmit={sendPhone}
                                loading={loading}
                                error={error}
                            />
                        ) : step === "login" ? (
                            <AuthLogin 
                                verifyLogin={verifyLogin}
                                loading={loading}
                            />
                        ) : <AuthRegister
                                verifyRegister={verifyRegister}
                            />
                    }
                </div>
            </div>
        </main>
    )
}
export default Auth;