import Login from "./Login.jsx";
import Register from "./Register.jsx";

const AuthForm = ({
    isLogin,
    ...formProps
}) => {
    
    const getTitle = () => ({
        title: "پوشاک الگی",
        subtitle: isLogin ? "ورود به حساب کاربری" : "عضویت در سایت"
    })
    const { title, subtitle } = getTitle();

    return (
        <div className="max-w-md mx-auto">
            <div className="mt-12 mb-6">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-2">
                    {title}
                </h1>
                <p className="text-center text-gray-500 text-sm">
                    {subtitle}
                </p>
            </div>

            {isLogin ? (
                <Login
                    {...formProps}
                />
            ) : (
                <Register
                    {...formProps}
                />
            )}
        </div>
    )
}
export default AuthForm;