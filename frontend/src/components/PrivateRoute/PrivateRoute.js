import React from "react";
// packages
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
//hooks
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const decode = jwtDecode(auth?.token);

   if(decode?.role!=="admin"||decode?.role!=="superAdmin"){
  return navigate('login')
  }
  return <>
{children}

  </>
}

export default PrivateRoute;
