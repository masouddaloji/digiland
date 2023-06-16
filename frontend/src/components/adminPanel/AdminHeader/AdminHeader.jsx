// packages
import { Link } from "react-router-dom";
//styles
import "./AdminHeader.css";
import { HiOutlineSearch } from "react-icons/hi";
import { BsBell } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { AiOutlinePoweroff } from "react-icons/ai";

const AdminHeader = ({ isShow, setIsShow, width }) => {
  return (
    <header className="admin__header">
      {width < 992 && (
        <FiMenu
          className="admin__menuIcon"
          onClick={() => setIsShow(true)}
        />
      )}
      <div className="adminSearch">
        <input type="text" placeholder="جستجو"/>
        <HiOutlineSearch className="adminSearch__icon" />
      </div>
      <div className="flex">
        <Link to="/" className="admin__headerLink" title="اطلاعیه ها">
          <BsBell className="admin__headerIcon" />
        </Link>
        <div className="admin__headerProfileBox">
          <img
            src="/images/profile/profile.jpg"
            alt=""
            className="admin__headerProfile"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
