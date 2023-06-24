//packages
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
//redux
import { selectToken } from "../../../features/auth/authSlice";

const RequiredLogin = () => {
  const location = useLocation();
  const token = useSelector(selectToken);

  if (token) {
    return <Outlet />;
  } else {
    return (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }
};

export default RequiredLogin;
