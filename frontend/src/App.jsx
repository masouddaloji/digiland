// packages
import { Routes, Route } from "react-router-dom";


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
import MainAdmin from "./components/adminPanel/main/MainAdmin";
import AdminProducts from "./components/adminPanel/AdminProducts/AdminProducts";
import AdminUsers from "./components/adminPanel/AdminUsers/AdminUsers";
import AdminOrders from "./components/adminPanel/AdminOrders/AdminOrders";
import AdminArticles from "./components/adminPanel/AdminArticles/AdminArticles";
import AddProduct from "./components/adminPanel/AddProduct/AddProduct";
import UserPanel from "./Pages/UserPanelLayout/Index";
import PersistLogin from "./features/auth/PersistLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EditProduct from "./components/adminPanel/EditProduct/EditProduct";
import Layout from "./components/Layout/Layout";
import AdminPanelLayout from "./Pages/AdminPanel/AdminPanelLayout";
import Orders from "./components/userPanel/Orders/Orders";
import MainPanel from "./components/userPanel/main";
import Favorite from "./components/userPanel/Favorite/Favorite";
import UserSetting from "./components/userPanel/UserSetting/UserSetting";
import Address from "./components/userPanel/Address/Address";
import AddArticles from "./components/adminPanel/AddArticles/AddArticles";
import EditArticles from "./components/adminPanel/EditArticles/EditArticles";
import Article from './Pages/Article/Article'
import WebLog from "./Pages/Articles/WebLog";
import EditUser from "./components/adminPanel/EditUser/EditUser";
import OrderInfo from "./components/userPanel/OrderInfo/OrderInfo";
import RequiredLogin from "./components/userPanel/RequiredLogin/RequiredLogin";

// styles
import "./App.css";

export default function App() {

  return (
    <div className="app__wrapper">
      <div className="app">
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
                <Route path="/order-pay" element={<SubmitOrder />} />
              </Route>
              </Route>
              {/* end basket */}
              {/* start product info */}
              <Route path="/product/:productId" element={<Product />} />
              {/* end product info */}
              {/* start article  */}
              <Route path="/article/:articleId" element={<Article />}/>
              <Route path="/articles" element={<WebLog />}/>
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
                  <Route path="/admin-editusers/:userId" element={<EditUser />} />
                  <Route path="/admin-orders" element={<AdminOrders />} />
                  <Route path="/admin-articles" element={<AdminArticles />} />
                  <Route path="/admin-addarticles" element={<AddArticles />} />
                  <Route path="/admin-editarticles/:articleId" element={<EditArticles />} />
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
          {/* start userpanel */}
        </Routes>
      </div>
    </div>
  );
}
