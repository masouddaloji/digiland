import { createContext, useEffect, useState } from "react";
// packages
import axios from "axios";

export const AuthContext = createContext({
  isLogin: false,
  userInfos: null,
  token: null,
  login: () => {},
  logout: () => {},
  getRefreshToken: () => {},
});
const AuthContextProvider = props => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfos, setUserInfos] = useState(null);
  const [token, setToken] = useState(null);

  const login = (token) => {
    localStorage.setItem("user", JSON.stringify({ token }));
    setToken(token);
    setIsLogin(true);
  };
  const logout = () => {
    setIsLogin(false);
    setToken(null);
    setUserInfos(null);
  };
  const getRefreshToken = async () => {
    await axios
      .get("http://localhost:8000/auth/refresh")
      .then((res) => {
        const token = res.data.accessToken;
        localStorage.setItem("user", JSON.stringify({ token }));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const localStorageData = localStorage.getItem("user");
    if (localStorageData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [login, logout]);
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        token,
        login,
        logout,
        getRefreshToken,
      }}
    >{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
