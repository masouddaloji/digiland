import React, { useEffect, useState } from "react";
// packages
import { useLocation, useRoutes } from "react-router-dom";

// components
import routes from "./Routes";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import axios from "./api/axios";
// contexts
import AuthContextProvider from "./Context/AuthContext";
//hooks
import useAuth from "./hooks/useAuth";
import useLogout from "./hooks/useLogout";
// styles
import "./App.css";

export default function App() {
  const { setAuth } = useAuth();
  const logout = useLogout();
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
