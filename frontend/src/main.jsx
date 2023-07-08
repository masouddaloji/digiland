import ReactDOM from "react-dom";
//packages
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
//component
import App from "./App";
//redux
import { Provider } from "react-redux";
import store from "./App/store";
//styles
import "./index.css";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="729918453652-2g0tennb34t1jjfs510nqdp027ne2jk4.apps.googleusercontent.com">
        <ScrollToTop>
          <App />
        </ScrollToTop>
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
  </BrowserRouter>,
  document.getElementById("root")
);
