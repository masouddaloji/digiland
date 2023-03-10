import React from "react";
// library
import { Link, NavLink, Outlet } from "react-router-dom";
// icons
import { AiOutlinePoweroff } from "react-icons/ai";
import { BiCog } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
// components
import Sidebar from "../../components/adminPanel/Sidebar/Sidebar";
// style
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="adminContent">
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="row">
                {/* <Sidebar /> */}
                <header className="admin__header">
                  <Link to="/" className="adminHeader__imgLink">
                    <img
                      src="/images/logo-mobile.png"
                      alt="logo site for mobile"
                      className="sidebar__img"
                    />
                  </Link>
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

                  <Link
                    to="/"
                    className="admin__headerLink"
                    title="خروج از حساب "
                  >
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
              </div>
              <div className="row">
                <div className="col-12">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
