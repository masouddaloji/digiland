//packages
import { Outlet } from "react-router-dom";
//components
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout