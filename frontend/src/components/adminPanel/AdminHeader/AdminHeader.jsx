import { useRef, useState } from "react";
//hooks
import useOutsideClick from "../../../hooks/useOutsideClick";
//icons
import { HiOutlineSearch } from "react-icons/hi";
import { BsBell } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
//styles
import "./AdminHeader.css";

const AdminHeader = ({ isShow, setIsShow, width }) => {
  const notifRef=useRef()
  const [isShowNotification, setIsShowNotification] = useState(false);
  useOutsideClick({ ref: notifRef, setStateHandler: setIsShowNotification })
  return (
    <header className="admin__header">
     {isShowNotification && <div className="notification__mask" ref={notifRef}></div>} 
      {width < 992 && (
        <FiMenu className="admin__menuIcon" onClick={() => setIsShow(true)} />
      )}
      <div className="adminSearch">
        <input type="text" placeholder="جستجو" />
        <HiOutlineSearch className="adminSearch__icon" />
      </div>
      <div className="admin__header-details">
        <div className="admin__header-notification">
          <BsBell className="admin__headerIcon" onClick={()=>setIsShowNotification(!isShowNotification)}/>

          <div className={`notification ${isShowNotification && "notification--show"}`}>
            <div className="notification__header">
              <h4>اعلانات</h4>
              <span>علامت بعنوان خوانده شده</span>
            </div>
            <ul>
              <li>
                <div className="notofication__img-box">
                  <img
                    src="http://localhost:8000/uploads/images/ZNTcoLw_BRgX9AAYcD0UC_boy.jpg"
                    alt=""
                    className="notification__img"
                  />
                </div>
                <p className="notification__text">
                  <span className="not__read">مدیر سایت</span>
                  <span>محصولات جدید اضافه شود</span>
                </p>
                <span className="notification__time">1 دقیقه پیش</span>
              </li>
              <li>
                <div className="notofication__img-box">
                  <img
                   src="http://localhost:8000/uploads/images/ZNTcoLw_BRgX9AAYcD0UC_boy.jpg"
                    alt=""
                    className="notification__img"
                  />
                </div>
                <p className="notification__text">
                  <span>
                 مدیر سایت
                  </span>
                  <span>
                  تخفیف پنج درصدی روی محصولات پرفروش افزوده شود
                  </span>
                </p>
                <span className="notification__time">1 دقیقه پیش</span>
              </li>
            </ul>
          </div>

        </div>
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
