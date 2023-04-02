import React, { useEffect } from "react";
// packages
import { Redirect, useNavigate } from "react-router-dom";
// hooks
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = ({ children }) => {
  const { auth, persist } = useAuth();
  const navigate = useNavigate();

  const refresh = useRefreshToken();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      }
    };
    !auth?.token && persist && verifyRefreshToken() 
  }, []);
  return <>{auth?.token ? <>{children}</> : navigate("/login")}</>;
};

export default PersistLogin;
