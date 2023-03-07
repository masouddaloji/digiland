import React, { useState } from "react";
// library
import { NavLink } from "react-router-dom";
// icons
import { AiOutlineCaretDown } from "react-icons/ai";
// styles
import "./SidebarItem.css";

const SidebarItem = ({ title, link, icon, submenu }) => {
  const [isShow,setIsShow]=useState(false)
  return (
    <li className="sidebarItem" >
    <NavLink className={({ isActive }) =>
    isActive ? "sidebarLink sidebarLink--active" : "sidebarLink"
  } to={link}>
    <span>
      {icon}
      {title}
    </span>
      {submenu && <AiOutlineCaretDown className="sidebarItem__iconDown" onClick={()=>setIsShow(!isShow)}/>}
    </NavLink>
    </li>
  );
};

export default SidebarItem;
