import { lazy } from "react";
// packages
import { Routes, Route } from "react-router-dom";

// components
const Index = lazy(() => import("./Pages/HomePage/Index"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));
const ProductsCategory = lazy(() =>
  import("./Pages/ProductsCategory/ProductsCategory")
);
const Product = lazy(() => import("./Pages/Product/Product"));
const BasketLayout = lazy(() => import("./Pages/BasketLayout/BasketLayout"));
const Cart = lazy(() => import("./components/userBasket/userCart/Cart"));
const CheckInformation = lazy(() =>
  import("./components/userBasket/CheckInformation/CheckInformation")
);
const SubmitOrder = lazy(() =>
  import("./components/userBasket/SubmitOrder/SubmitOrder")
);
const MainAdmin = lazy(() => import("./components/adminPanel/main/MainAdmin"));
const AdminProducts = lazy(() =>
  import("./components/adminPanel/AdminProducts/AdminProducts")
);
const AdminUsers = lazy(() =>
  import("./components/adminPanel/AdminUsers/AdminUsers")
);
const AdminOrders = lazy(() =>
  import("./components/adminPanel/AdminOrders/AdminOrders")
);
const AdminArticles = lazy(() =>
  import("./components/adminPanel/AdminArticles/AdminArticles")
);
const AddProduct = lazy(() =>
  import("./components/adminPanel/AddProduct/AddProduct")
);
const UserPanel = lazy(() => import("./Pages/UserPanelLayout/Index"));
const PersistLogin = lazy(() => import("./features/auth/PersistLogin"));
const PrivateRoute = lazy(() =>
  import("./components/PrivateRoute/PrivateRoute")
);
const EditProduct = lazy(() =>
  import("./components/adminPanel/EditProduct/EditProduct")
);
const Layout = lazy(() => import("./components/Layout/Layout"));
const AdminPanelLayout = lazy(() =>
  import("./Pages/AdminPanel/AdminPanelLayout")
);
const Orders = lazy(() => import("./components/userPanel/Orders/Orders"));
const MainPanel = lazy(() => import("./components/userPanel/main"));
const Favorite = lazy(() => import("./components/userPanel/Favorite/Favorite"));
const UserSetting = lazy(() =>
  import("./components/userPanel/UserSetting/UserSetting")
);
const Address = lazy(() => import("./components/userPanel/Address/Address"));
const AddArticles = lazy(() =>
  import("./components/adminPanel/AddArticles/AddArticles")
);
const EditArticles = lazy(() =>
  import("./components/adminPanel/EditArticles/EditArticles")
);
const Article = lazy(() => import("./Pages/Article/Article"));
const WebLog = lazy(() => import("./Pages/Articles/WebLog"));
const EditUser = lazy(() =>
  import("./components/adminPanel/EditUser/EditUser")
);
const OrderInfo = lazy(() =>
  import("./components/userPanel/OrderInfo/OrderInfo")
);
const RequiredLogin = lazy(() =>
  import("./components/userPanel/RequiredLogin/RequiredLogin")
);
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
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
      </div>
    </div>
  );
}
