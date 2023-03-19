import React, { useEffect, useState } from "react";
// packages
import { useLocation, useRoutes } from "react-router-dom";
// components
import routes from "./Routes";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// contexts
import AuthContext from "./Context/AuthContext";
// styles
import "./App.css";

export default function App() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRoutes(routes(products, categories));
  const [isLogin,setIsLogin]=useState(false)
  const [userInfos,setUserInfos]=useState(null)
  const [token,setToken]=useState(null)
  const allDataCategories=[]

  const login = (token) => {
        setToken(token);
        setIsLogin(true);
       localStorage.setItem("user", JSON.stringify({ token }));
      };
      const logout = () => {
        setIsLogin(false);
        setToken(null);
        setUserInfos(null);
      };
    

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        token,
        login,
        logout,
      }}
    >
      <div className="app">
        {location.pathname.includes("register") ||
        location.pathname.includes("login") ||location.pathname.includes("adminpanel")? null : (
          <Navbar categories={allDataCategories} isLoading={true}/>
        )}

        {router}
        {location.pathname.includes("register") ||
        location.pathname.includes("login") ||location.pathname.includes("adminpanel")? null : (
          <Footer />
        )}
      </div>
      </AuthContext.Provider>
  );
}




// export default function App() {
//   const location = useLocation();
//   const router = useRoutes(routes);
//   const [isLoggin, setIsLoggin] = useState(false);
//   const [userInfos, setUserInfos] = useState(null);
//   const [token, setToken] = useState(null);
//   const allDataCategories = [];
//   const loggin = (token) => {
//     setToken(token);
//     setIsLoggin(true);
//     const usertoken = localStorage.setItem("user", JSON.stringify({ token }));
//   };
//   const logout = () => {
//     setIsLoggin(false);
//     setToken(null);
//     setUserInfos(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggin,
//         token,
//         loggin,
//         logout,
//       }}
//     >
//       <div className="app">
//         {location.pathname.includes("register") ||
//         location.pathname.includes("login") ||
//         location.pathname.includes("adminpanel") ? null : (
//           <Navbar categories={allDataCategories} isLoading={true} />
//         )}

//         {router}
//         {location.pathname.includes("register") ||
//         location.pathname.includes("login") ||
//         location.pathname.includes("adminpanel") ? null : (
//           <Footer />
//         )}
//       </div>
//     </AuthContext.Provider>
//   );
// }
