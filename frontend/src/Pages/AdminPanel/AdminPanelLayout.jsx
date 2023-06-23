import { useEffect, useState } from "react";
// packages
import { Outlet } from "react-router-dom";

// components
import Sidebar from "../../components/adminPanel/Sidebar/Sidebar";
import AdminHeader from "../../components/adminPanel/AdminHeader/AdminHeader";
// style
import "./AdminPanelLayout.css";

const AdminPanelLayout = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  useEffect(() => {
    const resizeHandler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [window.innerWidth]);

  return (
    <div className="admin ss02">
      <Sidebar
        width={width}
        isShow={isShowSidebar}
        setIsShow={setIsShowSidebar}
      />

      {/* start admin content */}

      <div className="admin__content">
        <div className="col-12">
          <AdminHeader
            width={width}
            isShow={isShowSidebar}
            setIsShow={setIsShowSidebar}
          />
        </div>
        <div className={`admin__main`}>
          <Outlet />
        </div>
      </div>
      {/* end admin content */}
    </div>
  );
};

export default AdminPanelLayout;
