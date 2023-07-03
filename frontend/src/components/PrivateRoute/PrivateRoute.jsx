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
<<<<<<< HEAD
   null
=======
    <Loader />
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
  );

  return content;
};

export default PrivateRoute;
