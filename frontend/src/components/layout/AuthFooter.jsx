import { Link } from "react-router-dom"

const AuthFooter = () => {
    return (
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
    )
}
export default AuthFooter;