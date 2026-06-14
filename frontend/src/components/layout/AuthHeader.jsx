import { Link } from "react-router-dom";

const AuthHeader = () => {
    return(
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
    )
}
export default AuthHeader;