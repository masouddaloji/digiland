// components
import Index from "./Pages/HomePage/Index";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProductsCategory from "./Pages/ProductsCategory/ProductsCategory";
import CategorizedProducts from "./Pages/CategorizedProducts/CategorizedProducts";
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
import PersistLogin from "./features/auth/PersistLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const routes = [
  {
    path: "/",
    element: (
      <PersistLogin>
        <Index />
      </PersistLogin>
    ),
  },
  {
    path: "/products/",
    element: (
      <PersistLogin>
        <ProductsCategory />
      </PersistLogin>
    ),
    children: [
      {
        path: ":categoryName",
        element: <ProductsCategory />,
        children: [{ path: ":subCategory", element: <ProductsCategory /> }],
      },
      {
        path:"search/:searchParam",
        element:<ProductsCategory />
      }
    ],
  },
  {
    path: "/basket",
    element: (
      <PersistLogin>
        <UserBasket />
      </PersistLogin>
    ),
    children: [
      { path: "", element: <Cart /> },
      { path: "check-information", element: <CheckInformation /> },
      { path: "order-pay", element: <SubmitOrder /> },
    ],
  },
  {
    path: "/product/:productId",
    element: (
      <PersistLogin>
        <Product />
      </PersistLogin>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/userpanel",
    element: (
      <PersistLogin>
        <UserPanel />
      </PersistLogin>
    ),
  },
  {
    path: "/adminpanel",
    element: (
      <PersistLogin>
        <PrivateRoute>
          <AdminPanel />
        </PrivateRoute>
      </PersistLogin>
    ),
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
