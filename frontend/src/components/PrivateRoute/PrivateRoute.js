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
  console.log("decode", decode);
  //  if(decode?.role==="admin"||decode?.role==="superAdmin"){
  //  return children
  // }else{
  //   return navigate("/login")
  // }
  return(
    <>

  {
    decode?.role === "admin"
    ? children
    : decode?.role === "superAdmin"
    ? children
    : navigate("/login")
    }
    </>
  )
}

export default PrivateRoute;
