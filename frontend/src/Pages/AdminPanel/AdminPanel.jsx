import { useState } from "react";
// library
import { Link, NavLink, Outlet } from "react-router-dom";
// icons
import { AiOutlinePoweroff } from "react-icons/ai";
import { BiCog } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
// components
import Sidebar from "../../components/adminPanel/Sidebar/Sidebar";
// style
import "./AdminPanel.css";

const AdminPanel = () => {
  const[isShowSidebar,setIsShowSidebar]=useState(true)
  return (
    <div className="admin">
      <Sidebar isShowSidebar={isShowSidebar}/>
      {/* start admin header */}
      <div className={`admin__main ${isShowSidebar?"active":""}`}>
        <header className="admin__header">
        <FiMenu className="admin__menuIcon" onClick={()=>setIsShowSidebar(!isShowSidebar)}/>
        <div className="adminSearch">
            <input type="text" />
            <HiOutlineSearch className="adminSearch__icon"/>
          </div>
          <div className="flex">
            <Link
              to="/"
              className="admin__headerLink admin__notifications"
              title="اطلاعیه ها"
            >
              <BsBell className="admin__headerIcon" />
            </Link>
            <Link
              to="/"
              className="admin__headerLink admin__notifications"
              title="پیام ها"
            >
              <HiOutlineEnvelope className="admin__headerIcon" />
            </Link>
            <Link to="/" className="admin__headerLink" title="تنظیمات">
              <BiCog className="admin__headerIcon" />
            </Link>

            <Link to="/" className="admin__headerLink" title="خروج از حساب ">
              <AiOutlinePoweroff className="admin__headerIcon" />
            </Link>
            <div className="admin__headerProfileBox">
              <img
                src="/images/profile/profile.jpg"
                alt=""
                className="admin__headerProfile"
              />
            </div>
          </div>
         
        </header>
      {/* end admin header */}


          <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
