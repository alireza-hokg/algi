import { Routes, Route } from "react-router-dom"
import Header from "../components/layout/Header"

const AppRoutes = () => {
    return (
        <Routes>
            <Route 
            path="/" 
            element={<Header />}
            />
            
        </Routes>
    )
}
export default AppRoutes;