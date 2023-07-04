//packages
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
//redux
import { selectToken } from "../../../features/auth/authSlice";
import { useEffect, useState } from "react";

const RequiredLogin = () => {
  const location = useLocation();
  const token = useSelector(selectToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading && token) {
    return <Outlet />;
  }
  if (!isLoading && !token) {
    return (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }
};

export default RequiredLogin;
