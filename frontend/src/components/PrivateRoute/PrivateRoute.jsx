// packages
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
//hooks


const PrivateRoute = ({ children }) => {
  // const navigateToLogin = () => {
  //   navigate("/login", { replace: true });
  // };
  // const { auth } = useAuth();
  // const navigate = useNavigate();
  // if (!auth || !auth.token) {
  //   navigateToLogin();
  //   return null;
  // }

  // const decode = jwtDecode(auth.token);

  // if (decode.role !== "admin" && decode.role !== "superAdmin") {
  //   navigateToLogin();
  //   return null;
  // }

  return <>{children}</>;
};

export default PrivateRoute;
