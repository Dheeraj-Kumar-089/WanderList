import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { currUser, loading } = useContext(AuthContext);
    const location = useLocation();

    
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    
    if (!currUser) {
       
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    return children;
};

export default ProtectedRoute;