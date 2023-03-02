import React from "react";
// library
import { Link, NavLink } from "react-router-dom";
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
        <li className="sidebar__items">
          <Link to="/" className="sidebar__imgLink">
            {" "}
            <img
              src="/images/logo-mobile.png"
              alt="logo site for mobile"
              className="sidebar__img"
            />
          </Link>
        </li>
        <li className="sidebar__items">
          <NavLink
            to="/adminpanel/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar__link activedSidebar" : "sidebar__link"
            }
          >
            <RiHomeSmileLine className="sidebar__icon" />
            صفحه اصلی
          </NavLink>
        </li>
        <li className="sidebar__items">
          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive ? "sidebar__link activedSidebar" : "sidebar__link"
            }
          >
            <BsBoxSeam className="sidebar__icon" />
            محصولات
          </NavLink>
        </li>
        <li className="sidebar__items">
          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive ? "sidebar__link activedSidebar" : "sidebar__link"
            }
          >
            <HiOutlineUser className="sidebar__icon" />
            کاربران
          </NavLink>
        </li>
        <li className="sidebar__items">
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive ? "sidebar__link activedSidebar" : "sidebar__link"
            }
          >
            <MdOutlineAddShoppingCart className="sidebar__icon" />
            سفارشات
          </NavLink>
        </li>
        <li className="sidebar__items">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              isActive ? "sidebar__link activedSidebar" : "sidebar__link"
            }
          >
            <RiArticleLine className="sidebar__icon" />
            مقالات
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
