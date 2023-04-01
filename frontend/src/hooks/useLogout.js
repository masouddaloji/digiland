import React from "react";
// packages
import { toast } from "react-toastify";
// components
import axios from "../api/axios";
// hooks
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    try {
      const response = await axios("auth/logout", { withCredentials: true });
      if (response?.status === 200) {
        setAuth((prev) => ({ ...prev, token: null, isLogin: false }));
        toast.success("شما با موفقیت از حساب خود خارج شدید");
      }
    } catch (error) {
      toast.error("خروج از حساب با مشکل مواجه شد لطفا دوباره تلاش نمایید");
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
