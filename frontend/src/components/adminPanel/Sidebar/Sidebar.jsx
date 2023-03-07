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

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar__lists">
          <SidebarItem icon=<RiHomeSmileLine className="sidebarItem__mainIcon" /> title="داشبورد" link="/adminpanel/dashboard"/>
        <SidebarItem icon=<BsBoxSeam className="sidebarItem__mainIcon" /> title="محصولات" link="products"/>          
        <SidebarItem icon=<HiOutlineUser className="sidebarItem__mainIcon" /> title="کاربران" link="users"/>  
        <SidebarItem icon=<MdOutlineAddShoppingCart className="sidebarItem__mainIcon" /> title="سفارشات" link="orders"/>
        <SidebarItem icon=<RiArticleLine className="sidebarItem__mainIcon" /> title="مقالات" link="articles"/>
      </ul>
    </div>
  );
};

export default Sidebar;
