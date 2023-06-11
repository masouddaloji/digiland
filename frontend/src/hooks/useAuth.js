//packages
import jwtDecode from "jwt-decode";
//redux
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectToken);
  let userName = "";
  let userRole=null
  let userID=null
  if (token) {
    const decode = jwtDecode(token);
    const { email, role,userId } = decode;
     userName = email.split("@")[0];
     userRole=role
     userID=userId
  }
  return { userName, userRole,userID };
};

export default useAuth;
