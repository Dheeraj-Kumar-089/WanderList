import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { currUser, loading } = useContext(AuthContext);
    const location = useLocation();

    
  if (loading) {
    return (<div className="flex justify-center items-center h-screen text-3xl font-mono">Loading...   &nbsp;

      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>);
  }

    
    if (!currUser) {
       
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    return children;
};

export default ProtectedRoute;