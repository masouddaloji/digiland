// packages
import { Navigate, Outlet, useLocation } from "react-router-dom";
//hooks
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

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
    <Loader />
  );

  return content;
};

export default PrivateRoute;
