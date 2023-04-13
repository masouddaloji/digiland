import React from "react";
// packages
import { toast } from "react-toastify";
// components
import axios from "../api/axios";
// hooks
import useAuth from "./useAuth";
//persian texts
import { persianTexts } from "../text";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    try {
      const response = await axios("auth/logout", { withCredentials: true });
      console.log("response",response)
      if (response?.status === 200) {
        setAuth((prev) => ({ ...prev, token: null}));
        toast.success(persianTexts.useLogout.logoutSuccess);
      }
    } catch (error) {
      toast.error(persianTexts.useLogout.logoutError);
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
