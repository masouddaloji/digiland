import { useRef } from "react";
// packages
import { Link, NavLink } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
//hooks
import useOutsideClick from "../../../hooks/useOutsideClick";
//Constants
import { adminSidebarItems } from "../../../Constants";
//icons

import { IoClose } from "react-icons/io5";
// styles
import "./Sidebar.css";

const Sidebar = ({ isShow, setIsShow, width }) => {
  const adminmaskRef = useRef();
  useOutsideClick({ ref: adminmaskRef, setStateHandler: setIsShow });
  return (
    <>
      {width < 992 && (
        <div
          className={`admin__mask ${isShow && "admin__mask--show"}`}
          ref={adminmaskRef}
        ></div>
      )}
      <div
        className={` ${
          width >= 992
            ? "sidebar"
            : `sidebar__mobile ${isShow && "sidebar__mobile--show"}`
        }`}
      >
        {isShow && (
          <IoClose
            className="sidebar__closeIcon"
            onClick={() => setIsShow(false)}
          />
        )}
        <ul className="sidebar__lists">
          <Link to="/" className="sidebar__imgLink">
            <img
              src="/images/logo/digiland-text.webp"
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
                  if (isShow) setIsShow(false);
                }}
              >
                <span className="sidebarLink__iconBox">{item.icon}</span>
                {<span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
