import React from "react";
// packages
import { toast } from "react-toastify";
// components
import axios from "../api/axios";
// hooks
import useAuth from "./useAuth";
import useBasket from "./useBasket";
//persian texts
import { persianTexts } from "../text";

const useLogout = () => {
  const { setAuth } = useAuth();
  const {setBasketInfo}=useBasket()
  const logout = async () => {
    try {
      const response = await axios.post("auth/logout",{}, { withCredentials: true });
      console.log("response",response)
      if (response?.status === 200) {
        setAuth((prev) => ({ ...prev, token: null}));
        setBasketInfo({})
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
