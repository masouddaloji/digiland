//packages
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//rtk query
import { useLogOutUserMutation } from "../../../features/auth/authApiSlice";
//icons
import { IoLogOutOutline } from "react-icons/io5";
//constants
import { userPanelSidebarItems } from "../../../Constants";
//persianTexts
import { persianTexts } from "../../../text";
//styless
import "./SidebarUser.css";

const SidebarUser = () => {
  const navigate = useNavigate();
  const [logOutUser] = useLogOutUserMutation();
  const logOutHandler = () => {
    logOutUser().unwrap()
      .then((res) => {
        toast.success(persianTexts.useLogout.logoutSuccess);
        navigate("/");
      })
      .catch((error) => toast.error(persianTexts.useLogout.logoutError));
  };
  return (
    <div className="user-sidebar">
      <nav className="user-sidebar__navigation">
        <div className="user-sidebar__profile">
          <div className="user-sidebar__profile-box">
            <div className="user-sidebar__profile-box-border"></div>
            <img
              src="/images/avatar.png"
              alt=""
              className="user-sidebar__profile-img"
            />
          </div>
          <span className="user-sidebar__profile-name">مسعود</span>
        </div>
        <div className="user-sidebar__links">
          {userPanelSidebarItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className="user-sidebar__link"
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
  );
};

export default SidebarUser;
