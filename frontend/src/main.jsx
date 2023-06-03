import ReactDOM from "react-dom/client";
// components
import App from "./App";
// package
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { Provider } from "react-redux";
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
      <App />
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
      theme="light"
    />
    <ScrollToTop />
  </BrowserRouter>
);
