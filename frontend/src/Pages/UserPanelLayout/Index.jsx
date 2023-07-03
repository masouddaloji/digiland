import { useState } from "react";
//packages
import { Outlet } from "react-router-dom";
//components
import Header from "../../components/userPanel/Header/Header";
import SidebarUser from "../../components/userPanel/SidebarUser/SidebarUser";
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
