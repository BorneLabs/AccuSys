import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, userRole }) => {
    if (userRole === null) {
    return <h2>Loading...</h2>;  
  }
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
