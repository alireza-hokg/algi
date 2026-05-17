import { useState } from "react";

const AuthLogin = ({ verifyLogin }) => {
    const [password, setPassword] = useState("");

    const onChangePassword = e => {
        setPassword(e.target.value);
    }
    return(
        <div className="bg-white py-16 px-8 rounded-xl max-w-sm sm:max-w-md mx-auto">
            <h3
                className="text-3xl text-gray-700 mb-8"
            >ورود
            </h3>
            <p className="text-gray-500 text-md mb-2">لطفا رمز عبور خود را وارد کنید</p>
            <div className="mb-4">
                <input
                    value={password}
                    onChange={onChangePassword}
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
                onClick={()=> verifyLogin(password)}
            >ورود</button>
        </div>
    )
}
export default AuthLogin;