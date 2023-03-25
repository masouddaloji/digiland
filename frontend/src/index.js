import React from "react";
import ReactDOM from "react-dom/client";
// components
import App from "./App";
// package
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
// styles
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8000/";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);
