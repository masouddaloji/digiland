//packages
import jwtDecode from "jwt-decode";
//redux
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectToken);
  let userName = "";
  let userRole=null
  if (token) {
    const decode = jwtDecode(token);
    const { email, role } = decode;
     userName = email.split("@")[0];
     userRole=role
  }
  return { userName, userRole };
};

export default useAuth;
