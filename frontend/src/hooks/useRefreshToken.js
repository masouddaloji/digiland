//components
import axios from "../api/axios";
//hooks
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("auth/refresh", { withCredentials: true });
    if (response?.status === 200) {
      setAuth((prev) => ({ ...prev, token: response?.data?.accessToken }));
      return response?.data?.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
