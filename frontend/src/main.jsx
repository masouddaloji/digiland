import ReactDOM from "react-dom/client";
// components
import App from "./App";
// package
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
//components
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
//redux store
import store from "./App/store";
// styles
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="729918453652-2g0tennb34t1jjfs510nqdp027ne2jk4.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>

    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <ScrollToTop />
  </BrowserRouter>
);
