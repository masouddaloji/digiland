import React, { useEffect, useState } from "react";
// packages
import { useLocation, useRoutes } from "react-router-dom";

// components
import routes from "./Routes";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// contexts
import AuthContextProvider from "./Context/AuthContext";

// styles
import "./App.css";

export default function App() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRoutes(routes(products, categories));

  const allDataCategories = [];

  
  return (
      <AuthContextProvider>

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
      </AuthContextProvider>

  );
}
