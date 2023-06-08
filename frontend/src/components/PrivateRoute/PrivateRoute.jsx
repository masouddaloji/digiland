// packages
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
//hooks

const PrivateRoute = () => {
  const { userRole } = useAuth();
  const navigate=useNavigate()

  const navigateToLogin = () => {
    navigate("/login", { replace: true });
  };

  return userRole === "admin" || userRole === "superAdmin" ? (
    <Outlet/>
  ) : (
    navigateToLogin()
  );
};

export default PrivateRoute;
