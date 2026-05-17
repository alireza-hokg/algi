import { useState } from "react";

const AuthRegister = ({ verifyRegister }) => {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const onChangePassword = e => {
        setPassword(e.target.value);
    }
    const onChangeCode = e => {
        setCode(e.target.value)
    }
    return (
        <div className="bg-white py-16 px-8 rounded-xl max-w-sm sm:max-w-md mx-auto">
            <h3
                className="text-3xl text-gray-700 mb-8"
            >ورود
            </h3>
            <p className="text-gray-500 text-md mb-2">لطفا کد یکبار مصرف را وارد کنید</p>
            <div className="mb-4">
                <input
                    onChange={onChangeCode}
                    value={code}
                    type="text"
                    name="code"
                    id="code"
                    placeholder="کد یکبار مصرف"
                    className="bg-gray-200 p-2 rounded-md outline-0 w-full"
                />
            </div>
            <p className="text-gray-500 text-md mb-2">لطفا رمز عبور خود را وارد کنید</p>
            <div className="mb-4">
                <input
                    onChange={onChangePassword}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*******"
                    className="bg-gray-200 p-2 rounded-md outline-0 w-full"
                />
            </div>
            <button
                className="block w-full text-center text-lg py-2 rounded-md text-white bg-amber-500/80 
                cursor-pointer hover:bg-amber-500 duration-300 transition-color"
                type="button"
                onClick={() => verifyRegister(code, password)}
            >
            ورود
            </button>
        </div>
    )
}
export default AuthRegister;