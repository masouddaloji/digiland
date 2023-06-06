// packages
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
//hooks

const PrivateRoute = ({ children }) => {
  const { userRole } = useAuth();
  const navigate=useNavigate()

  const navigateToLogin = () => {
    navigate("/login", { replace: true });
  };

  return userRole === "admin" || userRole === "superAdmin" ? (
    <>{children}</>
  ) : (
    navigateToLogin()
  );
};

export default PrivateRoute;
