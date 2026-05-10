import AuthPassword from "../components/layout/AuthPassword";
import AuthPhone from "../components/layout/AuthPhone";

const Auth = () => {
    return(
        <main>
            <div className="bg-gray-100 min-h-screen p-0.5">
                <div className="mt-20 mb-6">
                    <h1 className="text-center text-4xl flex-1 mb-8">پوشاک آلگی</h1>

                    {/* <AuthPhone /> */}
                    <AuthPassword />
                </div>
            </div>
        </main>
    )
}
export default Auth;