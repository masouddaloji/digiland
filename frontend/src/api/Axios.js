import axios from "axios";

export default axios.create({
    baseURL : "http://localhost:8000/",
})
export const axiosInterceptor=axios.create({
    baseURL : "http://localhost:8000/",
    headers:{"Content-Type":"application/json"},
    withCredentials:true
})
axios.interceptors.request.use(res=>res,async (err)=>{
  const navigate = useNavigate();
  if (err.response.status === 403) {
    navigate("/login");
  }
  return Promise.reject(err);
})
axios.interceptors.response.use(
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