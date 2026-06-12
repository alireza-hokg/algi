import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js"
import Loading from "./Loading.jsx";

const ProtectedRoute = ({ children, redirectTo, allowedRoles}) => {
    const { isLogin, loading, user } = useAuth();
    const location = useLocation();
    if (loading) {
        return <Loading fullscreen={true} />
    }

    if (!isLogin) {
        return (
            <Navigate to={"/"} />
        )
    }
    const { role } = user;


    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to={"/"} replace/>
    }

    if (!isLogin) {
        <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    }
    return children
}
export default ProtectedRoute;