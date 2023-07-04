import { Suspense } from "react";
import { lazy } from "react";
// packages
import { Routes, Route } from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

// protect routes
import PersistLogin from "./features/auth/PersistLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RequiredLogin from "./components/userPanel/RequiredLogin/RequiredLogin";
//layouts
import Layout from "./components/Layout/Layout"
import BasketLayout from "./Pages/BasketLayout/BasketLayout"
import AdminPanelLayout from "./Pages/AdminPanel/AdminPanelLayout"
import UserPanel from "./Pages/UserPanelLayout/Index"
// pages
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"

const Index = Loadable(lazy(() => import("./Pages/HomePage/Index")))
const ProductsCategory = Loadable(lazy(() =>import("./Pages/ProductsCategory/ProductsCategory")))
const Product = Loadable(lazy(() => import("./Pages/Product/Product")))
const Cart = Loadable(lazy(() => import("./components/userBasket/userCart/Cart")))

const CheckInformation = Loadable(lazy(() =>import("./components/userBasket/CheckInformation/CheckInformation")))
const SubmitOrder = Loadable(lazy(() =>import("./components/userBasket/SubmitOrder/SubmitOrder")))
const MainAdmin = Loadable(lazy(() => import("./components/adminPanel/main/MainAdmin")))
const AdminProducts = Loadable(lazy(() =>import("./components/adminPanel/AdminProducts/AdminProducts")))
const AdminUsers = Loadable(lazy(() =>import("./components/adminPanel/AdminUsers/AdminUsers")))
const AdminOrders = Loadable(lazy(() =>import("./components/adminPanel/AdminOrders/AdminOrders")))
const AdminArticles = Loadable(lazy(() =>import("./components/adminPanel/AdminArticles/AdminArticles")))
const AddProduct = Loadable(lazy(() =>import("./components/adminPanel/AddProduct/AddProduct")))
const EditProduct = Loadable(lazy(() =>import("./components/adminPanel/EditProduct/EditProduct")))
const Orders = Loadable(lazy(() => import("./components/userPanel/Orders/Orders")))
const MainPanel = Loadable(lazy(() => import("./components/userPanel/main")))
const Favorite = Loadable(lazy(() => import("./components/userPanel/Favorite/Favorite")))
const UserSetting = Loadable(lazy(() =>import("./components/userPanel/UserSetting/UserSetting")))
const Address = Loadable(lazy(() => import("./components/userPanel/Address/Address")))
const AddArticles = Loadable(lazy(() =>import("./components/adminPanel/AddArticles/AddArticles")))
const EditArticles = Loadable(lazy(() =>import("./components/adminPanel/EditArticles/EditArticles")))
const Article = Loadable(lazy(() => import("./Pages/Article/Article")))
const WebLog = Loadable(lazy(() => import("./Pages/Articles/WebLog")))
const EditUser = Loadable(lazy(() =>import("./components/adminPanel/EditUser/EditUser")))
const OrderInfo = Loadable(lazy(() =>import("./components/userPanel/OrderInfo/OrderInfo")))
const NotFound = Loadable(lazy(() => import("./Pages/NotFound/NotFound")))

// styles
import "./App.css";
import Loader from "./components/Loader/Loader";

export default function App() {
  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
  return (
    <div className="app__wrapper">
      <div className="app">
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <Routes>
          {/* start persistLogin */}
          <Route element={<PersistLogin />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              {/* start product  */}
              <Route path="/products" element={<ProductsCategory />}>
                <Route path=":categoryName" element={<ProductsCategory />}>
                  <Route path=":subCategory" element={<ProductsCategory />} />
                </Route>
                <Route
                  path="search/:searchParam"
                  element={<ProductsCategory />}
                />
              </Route>
              {/* end product  */}
              {/* start basket */}
              <Route element={<RequiredLogin />}>
                <Route element={<BasketLayout />}>
                  <Route path="/basket" element={<Cart />} />
                  <Route
                    path="/check-information"
                    element={<CheckInformation />}
                  />
                  <Route path="/order-pay/:oId" element={<SubmitOrder />} />
                </Route>
              </Route>
              {/* end basket */}
              {/* start product info */}
              <Route path="/product/:productId" element={<Product />} />
              {/* end product info */}
              {/* start article  */}
              <Route path="/article/:articleId" element={<Article />} />
              <Route path="/articles" element={<WebLog />} />
              {/* end article  */}
            </Route>
            {/* start adminpanel */}
            <Route element={<PersistLogin />}>
              <Route element={<PrivateRoute />}>
                <Route element={<AdminPanelLayout />}>
                  <Route path="/adminpanel" element={<MainAdmin />} />
                  <Route path="/adminproducts" element={<AdminProducts />} />
                  <Route path="/admin-addproducts" element={<AddProduct />} />
                  <Route
                    path="/admin-editproduct/:productID"
                    element={<EditProduct />}
                  />
                  <Route path="/admin-users" element={<AdminUsers />} />
                  <Route
                    path="/admin-editusers/:userId"
                    element={<EditUser />}
                  />
                  <Route path="/admin-orders" element={<AdminOrders />} />
                  <Route path="/admin-articles" element={<AdminArticles />} />
                  <Route path="/admin-addarticles" element={<AddArticles />} />
                  <Route
                    path="/admin-editarticles/:articleId"
                    element={<EditArticles />}
                  />
                </Route>
              </Route>
            </Route>
            {/* end adminpanel */}

            <Route element={<RequiredLogin />}>
              <Route element={<UserPanel />}>
                <Route path="/userpanel" element={<MainPanel />} />
                <Route path="/userorders" element={<Orders />} />
                <Route path="/userorderInfo/:orderId" element={<OrderInfo />} />
                <Route path="/userfavorite" element={<Favorite />} />
                <Route path="/usersetting" element={<UserSetting />} />
                <Route path="/useraddress" element={<Address />} />
              </Route>
            </Route>
            {/* end userpanel */}
          </Route>
          {/* end persistLogin */}
          {/* this routes not use Header and footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      </div>
    </div>
  );
}
