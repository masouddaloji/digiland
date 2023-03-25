import { createContext, useEffect, useState } from "react";
// packages
import axios from "axios";

export const AuthContext = createContext({
  isLogin: false,
  userInfos: null,
  token: null,
  login: () => {},
  logout: () => {},
  setLocalToken: () => {},
  getLocalToken: () => {},
  removeLocalToken: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfos, setUserInfos] = useState(null);
  const [token, setToken] = useState(null);

  const setLocalToken = (token) =>
    localStorage.setItem("user", JSON.stringify({ token }));
  const getLocalToken = () => JSON.parse(localStorage.getItem("user")).token;
  const removeLocalToken = () => localStorage.removeItem("user");

  const login = (token) => {
    setLocalToken(token);
    setToken(token);
    setIsLogin(true);
  };
  const logout = () => {
    setIsLogin(false);
    setToken(null);
    removeLocalToken();
  };
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        token,
        login,
        logout,
        setLocalToken,
        getLocalToken,
        removeLocalToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
