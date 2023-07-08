import { useEffect, useState } from "react";

//packages
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//rtk query
import { useLogOutUserMutation } from "../../../features/auth/authApiSlice";
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
//hooks
import useAuth from "../../../hooks/useAuth";
import useConvertDate from "../../../hooks/useConvertDate";
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
  const navigate = useNavigate();
  const { data, isSuccess } = useGetUserByIdQuery(userID);
  const [width, setWidth] = useState(window.innerWidth);
  const [logOutUser] = useLogOutUserMutation();
  const logOutHandler = () => {
    logOutUser()
      .unwrap()
      .then((res) => {
        navigate("/", { replace: true });
        toast.success(persianTexts.useLogout.logoutSuccess);
      })
      .catch((error) => toast.error(persianTexts.useLogout.logoutError));
  }
  const today = new Date();
  const oneDaybefore = new Date().setDate(today.getDate() - 1);
  const oneDayAfter = new Date().setDate(today.getDate() + 1);
  const twoDaybefore = new Date().setDate(today.getDate() - 2);
  const twoDayAftyer = new Date().setDate(today.getDate() + 2);

  const convertDate =(date) => {
    const options = {
      day: "numeric",
      month: "long",
    };
    const persianDate = new Intl.DateTimeFormat("fa", options).format(date);
    const [day, month] = persianDate.split(" ");
    return (
      <span className="date__item ss02">
        <span>{day}</span>
        <span>{month}</span>
      </span>
    );
  }

  useEffect(() => {
    useConvertDate(new Date());
  }, []);

  const resizeHandler =() => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [window.innerWidth]);

  return (
    <div className={`${width >= 992 && "col-lg-4 col-xl-3"}`}>
      {isSuccess && (
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
                    src={`https://digiland-app.iran.liara.run${data.image}`}
                    alt=""
                    className="user-sidebar__profile-img"
                    onError={(e) => {
                      e.currentTarget.src = "/images/avatar.png";
                    }}
                  />
                ) : (
                  <img
                    src="/images/avatar.png"
                    alt=""
                    className="user-sidebar__profile-img"
                  />
                )}
              </div>
              {isSuccess && (
                <span className="user-sidebar__profile-name">
                  {data?.name ?? data.email?.split("@")[0]}
                </span>
              )}
            </div>
            <div className="user__date">
              <span>{convertDate(twoDayAftyer)}</span>
              <span>{convertDate(oneDayAfter)}</span>
              <span className="date__current">{convertDate(today)}</span>
              <span>{convertDate(oneDaybefore)}</span>
              <span>{convertDate(twoDaybefore)}</span>
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
      )}
    </div>
  );
};

export default SidebarUser;
