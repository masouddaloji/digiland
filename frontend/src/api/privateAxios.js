// packages
import axios from "axios";
import { useNavigate } from "react-router-dom";
//hooks
import useAuth from "../hooks/useAuth";

 const privateAxios=axios.create({
    baseURL : "http://localhost:8000/",
    withCredentials:true,
})


// privateAxios.interceptors.request.use(
//   (config) => {
//     const {auth} = useAuth()
//     if (auth?.token) {
//       config.headers.Authorization = `Bearer ${auth.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

privateAxios.interceptors.request.use(res=>res,async (err)=>{
  const navigate = useNavigate();
  if (err.response.status === 403) {
    navigate("/login");
  }
  return Promise.reject(err);
})
privateAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const navigate = useNavigate();
    if (err.response.status === 403) {
      navigate("/login");
    } else if (err.response.status === 401) {
      try {
        await axios
          .get("auth/refresh")
          .then((res) => {
            const token = res.data.accessToken;
            localStorage.setItem("user", JSON.stringify({ token }));
          })
          .catch((err) => console.log(err));
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export default privateAxios