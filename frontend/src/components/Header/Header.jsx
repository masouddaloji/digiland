import { useState, useEffect } from "react";
// packages
import { Link } from "react-router-dom";
// components
import Navbar from "../Navbar/Navbar";
import MobileMenuItem from "./MobileMenuItem";
import Search from "../Search/Search";
import { toast } from "react-toastify";
import SidebarCart from "../SidebarCart/SidebarCart";
//rtk query
import { useLogOutUserMutation } from "../../features/auth/authApiSlice";
import { useGetBasketQuery } from "../../features/basket/basketApiSlice";
//hooks
import useAuth from "../../hooks/useAuth";

// icons
import { IoPersonOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiShopify } from "react-icons/si";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
// constans
import { menus } from "../../Constants";
//persian text
import { persianTexts } from "../../text";
// styles
import "./Header.css";

export default function Header({}) {
  const { userName, userRole } = useAuth();
  const [logOutUser] = useLogOutUserMutation();
  const {
    data: baskets,
    isLoading: basketLoading,
    isSuccess: basketSuccess,
    isError: basketError,
  } = useGetBasketQuery();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState({ width: window.innerWidth });
  const [isShowSideBarCart, setIsShowSideBarCart] = useState(false);
  const [isShowFilterOptions, setIsShowFilterOptions] = useState(false);

  const resizaHandler = () => {
    setDeviceWidth({ width: window.innerWidth });
  };

  const logoutHandler = async () => {
    await logOutUser()
      .unwrap()
      .then(() => {
        toast.success(persianTexts.useLogout.logoutSuccess);
      })
      .catch((error) => {
        toast.error(persianTexts.useLogout.logoutError);
      });
  };

  useEffect(() => {
    window.addEventListener("resize", resizaHandler);
    return () => window.removeEventListener("resize", resizaHandler);
  }, []);

  return (
    <>
      {deviceWidth.width >= 992 ? (
        <header className="header">
          {/* start sidebar basket  */}
          <SidebarCart
            isShowSideBarCart={isShowSideBarCart}
            setIsShowSideBarCart={setIsShowSideBarCart}
          />
          {/* end sidebar basket  */}

          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                  <Link to="/" className="header__logo-box">
                    <img
                      src="/images/logo/1.png"
                      alt="logo-img"
                      className="header__logo-img"
                    />
                  </Link>
              </div>
              <div className="col-lg-6">
                <Search />
              </div>
              <div className="col-lg-3">
                <div className="header__leftBox">
                  {!userName ? (
                    <Link className="header__authUser" to="/login">
                      <div className="header__authUser-box">
                        <IoPersonOutline className="fullIcon" />
                      </div>
                      <span className="header__authUser-text">
                        ورود / عضویت
                      </span>
                    </Link>
                  ) : (
                    <div className="header__userInfo">
                      <div className="header__authUser-box">
                        <RiUserSettingsLine className="fullIcon" />
                      </div>
                      <span className="header__userName">
                        خوش اومدی {userName}
                      </span>
                      <ul className="header__userOptions">
                        {userRole === "superAdmin" || userRole === "admin" ? (
                          <li className="header__userOption">
                            <Link to="/adminpanel">پنل مدیریت</Link>
                          </li>
                        ) : null}
                        <li className="header__userOption">
                          <Link to="/userpanel">حساب کاربری</Link>
                        </li>
                        <li className="header__userOption">
                          {" "}
                          <Link to="/basket">سبد خرید</Link>
                        </li>
                        <li
                          className="header__userOption"
                          onClick={logoutHandler}
                        >
                          خروج
                        </li>
                      </ul>
                    </div>
                  )}

                  <div
                    className="basket"
                    onClick={() => setIsShowSideBarCart(true)}
                  >
                    <SiShopify className="basket__icon" />

                    {userName ? (
                      <>
                        {baskets?.totalQTY ? (
                          <span className="basket__counter ss02">
                            {baskets.totalQTY}
                          </span>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <Navbar />
          </div>
        </header>
      ) : (
        /* start mobile */
        <header className="mobileHeader">
          {/* start basket sidebar in mobile */}
          <SidebarCart
            isShowSideBarCart={isShowSideBarCart}
            setIsShowSideBarCart={setIsShowSideBarCart}
          />
          {/* end basket sidebar in mobile */}
          <div
            className={`${
              showMobileMenu ? "mobileMenu mobileMenu--show" : "mobileMenu"
            }`}
          >
            <div className="mobileMenu__close">
              <div className="mobileMenu__closeBox">
                <VscClose
                  className="mobileMenu__closeIcon fullIcon"
                  onClick={() => setShowMobileMenu(false)}
                />
              </div>
            </div>
            <ul className="mobileMenu__lists">
              {menus.map((menu) => (
                <li className="mobileMenu__item" key={menu.id}>
                  <MobileMenuItem {...menu} setShow={setShowMobileMenu}/>
                </li>
              ))}

              <li className="mobileMenu__item">
                <Link className="mobileMenu__link" to="/">
                  پرسش و پاسخ
                </Link>
              </li>
              <li className="mobileMenu__item">
                <Link className="mobileMenu__link" to="/">
                  پیگیری سفارش
                </Link>
              </li>
              <li className="mobileMenu__item">
                <Link className="mobileMenu__link" to="/">
                  سبد خرید
                </Link>
              </li>
            </ul>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-8 col-md-6">
                <div className="mobileHeader__rightBox">
                  <div className="mobileHeader__burgerBox">
                    <RxHamburgerMenu
                      className="mobileHeader__burgerIcon fullIcon"
                      onClick={() => setShowMobileMenu(true)}
                    />
                  </div>
                  <div className="mobileHeader__logoBox">
                    <img
                      src="/images/logo-mobile.png"
                      alt="logo site for mobile"
                      className="mobileHeader__logoImg"
                    />
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-6">
                <div className="mobileHeader__leftBox">
                  {!userName ? (
                    <Link className="mobileHeader__authUser" to="/login">
                      <div className="header__authUser-box">
                        <IoPersonOutline className="fullIcon" />
                      </div>
                    </Link>
                  ) : (
                    <div className="mobileHeader__userInfo">
                      <div className="header__authUser-box">
                        <RiUserSettingsLine className="fullIcon" />
                      </div>
                      <ul className="header__userOptions">
                        {userRole === "superAdmin" || userRole === "admin" ? (
                          <li className="header__userOption">
                            <Link to="/adminpanel">پنل مدیریت</Link>
                          </li>
                        ) : null}
                        <li className="header__userOption">
                        <Link to="/userpanel">حساب کاربری</Link>
                        </li>
                        <li className="header__userOption">
                          {" "}
                          <Link to="/basket">سبد خرید</Link>
                        </li>
                        <li
                          className="header__userOption"
                          onClick={logoutHandler}
                        >
                          خروج
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="mobileHeader__basket">
                    <FiShoppingBag
                      className="mobileHeader__basketIcon"
                      onClick={() => setIsShowSideBarCart(true)}
                    />
                    {userName ? (
                      <>
                        {baskets?.totalQTY ? (
                          <span className="mobileHeader__basketCounter ss02">
                            {baskets.totalQTY}
                          </span>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Search />
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
