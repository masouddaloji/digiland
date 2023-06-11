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

const Sidebar = ({ isFull,setIsFull }) => {
  return (
    <div className={`sidebar ${isFull ? "active" : ""}`}>
      {isFull && <IoClose className="sidebar__closeIcon" onClick={()=>setIsFull(false)}/>}
      <ul className="sidebar__lists">
        <Link to="/" className="sidebar__imgLink">
          {isFull ? (
            <img
              src="/images/logo-mobile.png"
              alt="logo site for mobile"
              className="sidebar__img"
            />
          ) : (
            <BiHome className="adminPanel__home" />
          )}
        </Link>
        {adminSidebarItems.map((item) => (
          <li className="sidebarItem" key={nanoid()}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLink--active" : "sidebarLink"
              }
              to={item.link}
              onClick={()=>{
                if(!isFull) setIsFull(false)
              }}
            >
              <span className="sidebarLink__iconBox">{item.icon}</span>
              {isFull && <span>{item.title}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
