import React from "react";
import axios from "../api/Axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("auth/refresh", { withCredentials: true });
    if (response?.status === 200) {
      setAuth((prev) => ({ ...prev, token: response?.data?.accessToken,isLogin:true }));
      console.log("refresh",response?.data?.accessToken)
      return response?.data?.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
