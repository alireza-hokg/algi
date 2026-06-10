import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js"
import Loading from "../layout/Loading.jsx";

const ProtectedRoute = ({ children, redirectTo}) => {
    const { isLogin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        <Loading
            fullscreen={true} 
        />
    }

    if (!isLogin) {
        <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    }
    return children
}
export default ProtectedRoute;