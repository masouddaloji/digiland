import React, { useState } from "react";
// library
import { NavLink } from "react-router-dom";
// icons
import { AiOutlineCaretDown } from "react-icons/ai";
// styles
import "./SidebarItem.css";

const SidebarItem = ({ title, link, icon, subMenus }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <li className="sidebarItem">
      <NavLink
        className={({ isActive }) =>
          isActive ? "sidebarLink sidebarLink--active" : "sidebarLink"
        }
        to={link?link:"#"}
        onClick={() => setIsShow(!isShow)}
      >
        <span>
          {icon}
          {title}
        </span>
        {subMenus && (
          <AiOutlineCaretDown
            className={` sidebarItem__iconDown ${isShow ? "rotate" : ""}`}
          />
        )}
      </NavLink>
      {subMenus && (
        <ul
          className={`sidebar__submenu ${
            isShow ? "sidebar__submenu--show" : ""
          }`}
        >
          {subMenus.map((sub) => (
            <li className="sidebar__submenuItem">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "sidebarLink sidebarLink--active" : "sidebarLink"
                }
                to={sub.link}
              >
                <span>
                  {sub.icon}
                  {sub.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
