import React from "react";
// library
import { Link, NavLink } from "react-router-dom";
// components
import SidebarItem from './../../SidebarItem/SidebarItem'
// icons
import { HiOutlineUser } from "react-icons/hi";
import { RiArticleLine, RiHomeSmileLine } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineAddShoppingCart } from "react-icons/md";
// styles
import "./Sidebar.css";
import { adminSidebarItems } from "../../../Constants";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar__lists">
      {adminSidebarItems.map(item=>(
        <SidebarItem key={item.title} {...item}/>
      ))}
      </ul>
    </div>
  );
};

export default Sidebar;
