import React from "react";
// packages
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
//hooks
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  const navigate=useNavigate()
  if (!auth || !auth.token) {
    return navigate("/login")
  }

  const decode = jwtDecode(auth.token);

  if (decode.role !== "admin" && decode.role !== "superAdmin") {
    return navigate("/login")
  }

  return <>{children}</>;
};

export default PrivateRoute;
