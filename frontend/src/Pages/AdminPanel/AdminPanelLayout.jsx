import { useEffect, useState } from "react";
// packages
import { Outlet } from "react-router-dom";

// components
import Sidebar from "../../components/adminPanel/Sidebar/Sidebar";
import AdminHeader from "../../components/adminPanel/AdminHeader/AdminHeader";
// style
import "./AdminPanelLayout.css";

const AdminPanelLayout = () => {
  const [width,setWidth]=useState(window.innerWidth)
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  
  useEffect(()=>{
    const resizeHandler=()=>setWidth(window.innerWidth)
    window.addEventListener("resize",resizeHandler)
    return ()=>window.removeEventListener("resize",resizeHandler)
  },[window.innerWidth])

  return (
    <div className="admin">
      <div className="container">
        <div className="row">
          <div className={`${width>=992&&"col-lg-3 col-xl-2"}`}>
            <Sidebar width={width} isShow={isShowSidebar} setIsShow={setIsShowSidebar} />
          </div>
          <div className="col-12 col-lg-9 col-xl-10">
            <AdminHeader width={width} isShow={isShowSidebar} setIsShow={setIsShowSidebar} />
            <div className={`admin__main`}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelLayout;
