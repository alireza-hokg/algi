import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js"
import Loading from "./Loading.jsx";

const GuestRoute = ({children}) => {
    const { isLogin, loading } = useAuth();

    if (loading) {
        return (
            <Loading 
                fullscreen={true}
            />
        )
    }
    if (isLogin) {
        return <Navigate to={"/"} replace />
    }

    return children
}
export default GuestRoute