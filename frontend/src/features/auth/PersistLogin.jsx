import { useEffect } from "react";
//packages
import { Outlet } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { selectToken } from "./authSlice";
//rtk query
import { useGetRefreshTokenMutation } from "./authApiSlice";
//hooks
import usePersistLogin from "../../hooks/usePersistLogin";

const PersistLogin = () => {
  const [getRefreshToken] = useGetRefreshTokenMutation();
  const [persist] = usePersistLogin();
  const token = useSelector(selectToken);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await getRefreshToken();
      } catch (error) {
        console.log(error);
      }
    };
    if (!token && persist) verifyRefreshToken();
  }, []);

  return <Outlet/>;
};

export default PersistLogin;
