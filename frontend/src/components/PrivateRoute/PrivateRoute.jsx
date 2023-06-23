// packages
import { Navigate, Outlet, useLocation } from "react-router-dom";
//hooks
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { userRole } = useAuth();
  const location = useLocation();

  const content =
    userRole === "admin" || userRole === "superAdmin" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );

  return content;
};

export default PrivateRoute;
