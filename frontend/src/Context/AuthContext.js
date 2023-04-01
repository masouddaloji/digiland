import { createContext, useEffect, useState } from "react";
// packages
import axios from "axios";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const[auth,setAuth]=useState({
    token:null,
    isLogin:false,
  })
  const [persist,setPersist]=useState(JSON.parse(localStorage.getItem("persist"))|| false)


  return (
    <AuthContext.Provider
      value={{auth,setAuth,persist,setPersist}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
