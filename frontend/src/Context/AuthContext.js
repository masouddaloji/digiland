import { createContext } from "react";

const AuthContext=createContext({
    isLoggin:false,
    userInfos:null,
    token:null,
    login:()=>{},
    logout:()=>{}
})