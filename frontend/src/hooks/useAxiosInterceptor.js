import { useEffect } from "react";
// hooks
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
// axios
import axios from "../api/Axios";
import { axiosInterceptor } from "../api/Axios";

const useAxiosInterceptor = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosInterceptor.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInterceptor.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInterceptor(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInterceptor.interceptors.request.eject(requestInterceptor);
      axiosInterceptor.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);
  return axiosInterceptor;
};

export default useAxiosInterceptor;
