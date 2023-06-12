import { useEffect, useState } from "react";

//packages
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//rtk query
import { useLogOutUserMutation } from "../../../features/auth/authApiSlice";
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
//hooks
import useAuth from "../../../hooks/useAuth";
//icons
import { IoClose, IoLogOutOutline } from "react-icons/io5";
//constants
import { userPanelSidebarItems } from "../../../Constants";
//persianTexts
import { persianTexts } from "../../../text";
//styless
import "./SidebarUser.css";

const SidebarUser = ({ isShow, setshow }) => {
  const { userID } = useAuth();
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(userID);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [logOutUser] = useLogOutUserMutation();
  const logOutHandler = () => {
    logOutUser()
      .unwrap()
      .then((res) => {
        toast.success(persianTexts.useLogout.logoutSuccess);
        navigate("/");
      })
      .catch((error) => toast.error(persianTexts.useLogout.logoutError));
  };

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [window.innerWidth]);
  isSuccess && console.log("data",data);
  return (
    <div className={`${width >= 992 && "col-lg-3"}`}>
      <div className={`user-sidebar ${isShow && "user-sidebar--show"}`}>
        {isShow && (
          <IoClose
            className="user-sidebar__closeIcon"
            onClick={() => setshow(false)}
          />
        )}
        <nav className="user-sidebar__navigation">
          <div className="user-sidebar__profile">
            <div className="user-sidebar__profile-box">
              <div className="user-sidebar__profile-box-border"></div>
              {isSuccess && data?.image ? (
                <img
                  src={`http://localhost:8000${data.image}`}
                  alt=""
                  className="user-sidebar__profile-img"
                />
              ) : (
                <img
                  src="/images/avatar.png"
                  alt=""
                  className="user-sidebar__profile-img"
                />
              )}
            </div>
            {isSuccess && <span className="user-sidebar__profile-name">{data?.email?.split("@")[0]}</span>}
          </div>
          <div className="user-sidebar__links">
            {userPanelSidebarItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.link}
                className="user-sidebar__link"
                onClick={() => setshow(false)}
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            ))}
            <div className="user-sidebar__link" onClick={logOutHandler}>
              <IoLogOutOutline className="user-sidebar__icon" />
              <span>خروج از حساب</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarUser;
