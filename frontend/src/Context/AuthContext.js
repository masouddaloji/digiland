import { createContext, useEffect, useState } from "react";
// packages
import axios from "axios";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const[auth,setAuth]=useState({
    token:null,
    isLogin:false,

  })


  return (
    <AuthContext.Provider
      value={{auth,setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
