import { createContext } from "react";

const AuthContext=createContext({
    isLogin:false,
    userInfos:null,
    token:null,
    login:()=>{},
    logout:()=>{}
})
export default AuthContext