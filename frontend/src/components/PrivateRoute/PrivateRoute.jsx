// packages
import { Navigate, Outlet, useLocation } from "react-router-dom";
//hooks
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { userRole } = useAuth();
  const location = useLocation();

  const content = userRole ? (
    userRole === "admin" || userRole === "superAdmin" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  ) : (
   null
  );

  return content;
};

export default PrivateRoute;
