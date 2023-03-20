import Index from "./Pages/HomePage/Index";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Category from "./Pages/Category/Category";
import ProductsCategory from "./Pages/ProductsCategory/ProductsCategory";
import CategorizedProducts from "./Pages/CategorizedProducts/CategorizedProducts";
import { Children } from "react";
import Product from "./Pages/Product/Product";
import UserBasket from "./Pages/UserBasket/UserBasket";
import Cart from "./components/userBasket/userCart/Cart";
import CheckInformation from "./components/userBasket/CheckInformation/CheckInformation";
import SubmitOrder from "./components/userBasket/SubmitOrder/SubmitOrder";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import MainAdmin from "./components/adminPanel/main/MainAdmin";
import AdminProducts from "./components/adminPanel/AdminProducts/AdminProducts";
import AdminUsers from "./components/adminPanel/AdminUsers/AdminUsers";
import AdminOrders from "./components/adminPanel/AdminOrders/AdminOrders";
import AdminArticles from "./components/adminPanel/AdminArticles/AdminArticles";
import AddProduct from "./components/adminPanel/AddProduct/AddProduct";
import UserPanel from "./Pages/UserPanel/Index";

const routes = (products, categories) => [
  { path: "/", element: <Index /> },
  {
    path: "/products-category/:categoryName",
    element: <ProductsCategory products={products} categories={categories} />,
    children: [{ path: ":subCategory", element: <ProductsCategory /> }],
  },
  {
    path: "/basket",
    element: <UserBasket />,
    children: [
      { path: "", element: <Cart /> },
      { path: "check-information", element: <CheckInformation /> },
      { path: "order-pay", element: <SubmitOrder /> },
    ],
  },
  { path: "/product/:productId", element: <Product /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/userpanel",
  element: <UserPanel />,},
  {
    path: "/adminpanel",
    element: <AdminPanel />,
    children: [
      { path: "dashboard", element: <MainAdmin /> },
      { path: "products", element: <AdminProducts /> },
      { path: "add-products", element: <AddProduct /> },
      { path: "users", element: <AdminUsers /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "articles", element: <AdminArticles /> },
    ],
  },
];
export default routes;
