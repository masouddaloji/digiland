<<<<<<< HEAD
import { useState } from "react";
=======
import { Suspense, useState } from "react";
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
//packages
import { Outlet } from "react-router-dom";
//components
import Header from "../../components/userPanel/Header/Header";
import SidebarUser from "../../components/userPanel/SidebarUser/SidebarUser";
<<<<<<< HEAD
=======
import Loader from "../../components/Loader/Loader";
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
//styles
import "./index.css";

const UserPanel = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  return (
    <section className="userPanel">
      <div className="userPanelHeader">
        <div className="container">
          <Header setshow={setIsShowSidebar} />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <SidebarUser isShow={isShowSidebar} setshow={setIsShowSidebar} />
          <div className="col-12 col-lg-8 col-xl-9">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPanel;
