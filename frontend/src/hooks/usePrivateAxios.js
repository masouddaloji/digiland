import { useEffect } from "react";

// axios
import axios from "../api/axios";
import privateAxios from "../api/privateAxios";

const usePrivateAxios = () => {
  const token=useSelector(selectToken)


  useEffect(() => {
    const requestInterceptor = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = privateAxios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = "123456";
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateAxios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [auth]);
  return privateAxios;
};

export default usePrivateAxios;
