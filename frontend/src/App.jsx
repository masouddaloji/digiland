// packages
import { Routes, Route } from "react-router-dom";

// components
// import routes from "./Routes";
// import Navbar from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";

// components
import Index from "./Pages/HomePage/Index";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProductsCategory from "./Pages/ProductsCategory/ProductsCategory";
import Product from "./Pages/Product/Product";
import BasketLayout from "./Pages/BasketLayout/BasketLayout";
import Cart from "./components/userBasket/userCart/Cart";
import CheckInformation from "./components/userBasket/CheckInformation/CheckInformation";
import SubmitOrder from "./components/userBasket/SubmitOrder/SubmitOrder";
import AdminPanel from "./Pages/AdminPanel/AdminPanelLayout";
import MainAdmin from "./components/adminPanel/main/MainAdmin";
import AdminProducts from "./components/adminPanel/AdminProducts/AdminProducts";
import AdminUsers from "./components/adminPanel/AdminUsers/AdminUsers";
import AdminOrders from "./components/adminPanel/AdminOrders/AdminOrders";
import AdminArticles from "./components/adminPanel/AdminArticles/AdminArticles";
import AddProduct from "./components/adminPanel/AddProduct/AddProduct";
import UserPanel from "./Pages/UserPanel/Index";
import PersistLogin from "./features/auth/PersistLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EditProduct from "./components/adminPanel/EditProduct/EditProduct";
import Layout from "./components/Layout/Layout";
// styles
import "./App.css";
import AdminPanelLayout from "./Pages/AdminPanel/AdminPanelLayout";

export default function App() {
  const allDataCategories = [];

  return (
    <div className="app__wrapper">
      <div className="app">
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PersistLogin />}>
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
              <Route element={<BasketLayout />}>
                <Route path="/basket" element={<Cart />} />
                <Route
                  path="/check-information"
                  element={<CheckInformation />}
                />
                <Route path="/order-pay" element={<SubmitOrder />} />
              </Route>
              {/* end basket */}

              {/* start product info */}
              <Route path="/product/:productId" element={<Product />} />
              {/* end product info */}
            </Route>
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
                <Route path="/admin-orders" element={<AdminOrders />} />
                <Route path="/admin-articles" element={<AdminArticles />} />
              </Route>
            </Route>
          </Route>
          {/* end adminpanel */}

          {/* this routes not use Header and footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userpanel" element={<UserPanel />} />
        </Routes>
      </div>
    </div>
  );
}
