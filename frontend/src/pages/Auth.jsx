import { useState } from "react";

import AuthLogin from "../components/page-components/AuthLogin.jsx"
import AuthRegister from "../components/page-components/AuthRegister.jsx"

const Auth = () => {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState("login");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleStep = () => {
        setPhone("");
        setPassword("");
        setError("");
        setStep(step === "login" ? "register" : "login")
    }

    return(
        <main>
            <div className="bg-gray-100 min-h-screen p-0.5">
                <div className="mt-20 mb-6">
                    <h1 className="text-center text-4xl flex-1 mb-8">پوشاک آلگی</h1>
                    {step === "login" ? 
                        <AuthLogin 
                            phone={phone}
                            setPhone={setPhone}
                            password={password}
                            setPassword={setPassword}
                            error={error}
                            loading={loading}
                            onToggle={toggleStep}
                        /> : <AuthRegister 
                            phone={phone}
                            setPhone={setPhone}
                            password={password}
                            setPassword={setPassword}
                            error={error}
                            loading={loading}
                            onToggle={toggleStep}
                        />
                    }
                </div>
            </div>
        </main>
    )
}
export default Auth;