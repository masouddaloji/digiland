import React, { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./Routes";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductsContext from "./../src/Context/ProductsContext";
import "./App.css";
import token from "./utils/api";
import useFetch from "./hooks/useFetch";

export default function App() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRoutes(routes(products, categories));

  const getAllProducts = async () => {
    await fetch("http://localhost:1337/api/products?populate=deep")
      .then((res) => res.json())
      .then((allProducts) => setProducts(allProducts.data));
  };
  const getCategory = async () => {
    await fetch("http://localhost:1337/api/categories?populate=deep", {
      headers: { Authorization: `bearer ${token}` },
    })
      .then((res) => res.json())
      .then((allData) => {
        setCategories(allData.data);
      });
  };
  const {
    isLoading: isLoadingProducts,
    error: errorProducts,
    allData: allDataProducts,
  } = useFetch({
    url: "http://localhost:1337/api/products?populate=deep",
    method: "",
    headers: {},
    body: "",
  });
  const {
    isLoading: isLoadingCategories,
    error: errorCategories,
    allData: allDataCategories,
  } = useFetch({
    url: "http://localhost:1337/api/categories?populate=deep",
    method: "",
    headers: {},
    body: "",
  });
  // useEffect(() => {
  //   getAllProducts();
  //   getCategory();
  // }, []);
  return (
    <ProductsContext.Provider
      value={{
        isLoadingProducts,
        errorProducts,
        products: allDataProducts,
        isLoadingCategories,
        errorCategories,
        categories: allDataCategories,
      }}
    >
      <div className="app">
        {location.pathname.includes("register") ||
        location.pathname.includes("login") ||location.pathname.includes("adminpanel")? null : (
          <Navbar categories={allDataCategories} isLoading={isLoadingCategories}/>
        )}

        {router}
        {location.pathname.includes("register") ||
        location.pathname.includes("login") ||location.pathname.includes("adminpanel")? null : (
          <Footer />
        )}
      </div>
    </ProductsContext.Provider>
  );
}
