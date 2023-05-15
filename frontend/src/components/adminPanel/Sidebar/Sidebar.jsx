// packages
import { Link, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// components

//Constants
import { adminSidebarItems } from "../../../Constants";

// styles
import "./Sidebar.css";
import { BiHome } from "react-icons/bi";

const Sidebar = ({ isShowSidebar }) => {
  return (
    <div className={`sidebar ${isShowSidebar ? "active" : ""}`}>
      <ul className="sidebar__lists">
        <Link to="/" className="sidebar__imgLink">
        {!isShowSidebar? <img
            src="/images/logo-mobile.png"
            alt="logo site for mobile"
            className="sidebar__img"
          />:<BiHome className="adminPanel__home"/>}
         
        </Link>
        {adminSidebarItems.map(item => <li className="sidebarItem" key={uuidv4()}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebarLink sidebarLink--active" : "sidebarLink"
              }
              to={item.link}
            >
              <span className="sidebarLink__iconBox">{item.icon}</span>
             <span>{item.title}</span>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
