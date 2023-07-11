//packages
import { Navigate, Outlet, useLocation } from "react-router-dom";
//redux
import { useEffect, useState } from "react";
//custom hook
import useAuth from "../../../hooks/useAuth";

const RequiredLogin = () => {
  const location = useLocation();
const {token}=useAuth()

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
