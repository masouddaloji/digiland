import {axiosInstance,privateAxiosInstance} from './axiosInstance'
import useNavigation from './../hooks/useNavigation'
const { goToLogin } = useNavigation();

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    if (error.response.status === 403) {
      goToLogin();
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await axiosInstance.get("auth/refresh");
        const token = response.data.accessToken;
        localStorage.setItem("user", JSON.stringify({ token }));
        return axiosInstance(error.config);
      } catch (e) {
        goToLogin();
      }
    } else if (error.response.status === 403) {
      goToLogin();
    }
    return Promise.reject(error);
  }
);