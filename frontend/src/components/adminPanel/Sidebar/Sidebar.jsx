// packages
import { Link, NavLink } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
//Constants
import { adminSidebarItems } from "../../../Constants";
//icons
import { BiHome } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
// styles
import "./Sidebar.css";

const Sidebar = ({ isShow, setIsShow, width }) => {
  return (
    <div className={` ${width >= 992 ? "sidebar" : `sidebar__mobile ${isShow&& "sidebar__mobile--show"}`}`}>
      {isShow && (
        <IoClose
          className="sidebar__closeIcon"
          onClick={() => setIsShow(false)}
        />
      )}
      <ul className="sidebar__lists">
        <Link to="/" className="sidebar__imgLink">
          <img
            src="/images/logo/logo.jpg"
            alt="logo site for mobile"
            className="sidebar__img"
          />
        </Link>
        {adminSidebarItems.map((item) => (
          <li className="sidebarItem" key={nanoid()}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLink--active" : "sidebarLink"
              }
              to={item.link}
              onClick={() => {
                if (!isShow) setIsShow(false);
              }}
            >
              <span className="sidebarLink__iconBox">{item.icon}</span>
              {<span>{item.title}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
