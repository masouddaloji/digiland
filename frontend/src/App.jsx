// packages
import { useLocation, useRoutes } from "react-router-dom";

// components
import routes from "./Routes";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


// styles
import "./App.css";

export default function App() {
  const location = useLocation();
  const router = useRoutes(routes);
  const allDataCategories = [];

  return (
      <div className="app__wrapper">
        <div className="app">
          {location.pathname.includes("register") ||
          location.pathname.includes("login") ||
          location.pathname.includes("adminpanel") ? null : (
            <Navbar categories={allDataCategories} isLoading={true} />
          )}

          {router}
          {location.pathname.includes("register") ||
          location.pathname.includes("login") ||
          location.pathname.includes("adminpanel") ? null : (
            <Footer />
          )}
        </div>
      </div>
  );
}
