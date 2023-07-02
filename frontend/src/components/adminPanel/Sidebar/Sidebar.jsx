import { useCallback, useRef } from "react";
// packages
import { Link, NavLink, useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
//rtk query
import { useLogOutUserMutation } from "../../../features/auth/authApiSlice";
//hooks
import useOutsideClick from "../../../hooks/useOutsideClick";
//Constants
import { adminSidebarItems } from "../../../Constants";
//icons
import { TbLogout } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
//persian text
import { persianTexts } from "../../../text";
// styles
import "./Sidebar.css";

const Sidebar = ({ isShow, setIsShow, width }) => {
  const navigate=useNavigate()
  const adminmaskRef = useRef();
  useOutsideClick({ ref: adminmaskRef, setStateHandler: setIsShow });

  const [logOutUser] = useLogOutUserMutation();

  const logoutAdminHandler = useCallback(() => {
    logOutUser()
      .unwrap()
      .then((response) => {
        navigate('/', { replace: true });
        toast.success(persianTexts.useLogout.logoutSuccess);
      })
      .catch((error) => {
        toast.error(persianTexts.useLogout.logoutError);
      });
  },[]);
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
          <li className="sidebarItem" key={nanoid()} onClick={logoutAdminHandler}>
            <div className="sidebarLink">
              <span className="sidebarLink__iconBox">
                <TbLogout className="sidebarItem__mainIcon" />
              </span>
              {<span>خروج</span>}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
