import { useState, useEffect, useRef, useContext } from "react";
// packages
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
// components
import Navbar from "../Navbar/Navbar";
import MobileMenuItem from "./MobileMenuItem";

//hooks
import useLogout from "../../hooks/useLogout";
import useBasket from "../../hooks/useBasket";
// contexts
import useAuth from "../../hooks/useAuth";
// icons
import { TfiSearch } from "react-icons/tfi";
import { TbApps } from "react-icons/tb";
import { IoBagHandleOutline, IoPersonOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiShopify } from "react-icons/si";
import { CgCloseO } from "react-icons/cg";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
// constans
import { menus } from "../../Constants";
//persian text
import { persianTexts } from "../../text";
// styles
import "./Header.css";

import ProductCount from "../ProductCount/ProductCount";

export default function Header({}) {
  const { basketInfo, getUserBasket, removeItemFromBasket } = useBasket();
  const [showCategory, setShowCategory] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [showLoader, setShowLoader] = useState(false);
  const [seeSearchResult, setSeeSearchResult] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState({ width: window.innerWidth });
  const [isShowSideBarCart, setIsShowSideBarCart] = useState(false);
  const { auth } = useAuth();
  const logout = useLogout();
  const categoryRef = useRef();
  const btnCategoryRef = useRef();
  const maskRef = useRef();
  const searchRef = useRef();
  const sideBarCartRef = useRef();
  const resizaHandler = () => {
    setDeviceWidth({ width: window.innerWidth });
  };

  const closeSideBarBasket = (e) => {
    if (maskRef.current === e.target) {
      setIsShowSideBarCart(false);
    }
  };
  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (!searchRef?.current?.contains(e.target)) {
        setShowCategory(false);
      }
    };
    document.body.addEventListener("click", outsideClickHandler);
    return () => {
      document.body.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizaHandler);
    return () => window.removeEventListener("resize", resizaHandler);
  }, []);
  useEffect(() => {

    if (auth.token) {
      getUserBasket();
    }
  }, [auth.token]);

  return (
    <>
      {deviceWidth.width >= 992 ? (
        <header className="header">
          {/* start sidebar basket  */}
          <div
            className={`mask ${isShowSideBarCart ? "mask--show" : ""}`}
            ref={maskRef}
            onClick={closeSideBarBasket}
          ></div>
          <div
            className={`sideBarCart ${
              isShowSideBarCart ? "sideBarCart--show" : ""
            }`}
            ref={sideBarCartRef}
          >
            <div className="sideBarCart__header">
              <div>
                <span>سبد خرید</span>
                <span className="sideBarCart__headerCount ss02">
                  {basketInfo?.totalQTY}
                </span>
              </div>
              <IoMdClose
                className="sideBarCart__headerCloseBtn"
                onClick={() => setIsShowSideBarCart(false)}
              />
            </div>
            {basketInfo?.cartItems?.length ? (
              <ul className="sideBarCart__Lists">
                {basketInfo?.cartItems?.map((item) => (
                  <li className="sideBarCart__ListsItem" key={item._id}>
                    <div className="sideBarCart__imgBox">
                      <Link to="/" className="sideBarCart__Link">
                        <img
                          src={`http://localhost:8000${item?.productId?.image}`}
                          alt="mini image products"
                          className="sideBarCart__img"
                        />
                      </Link>
                      <CgCloseO
                        className="sideBarCart__removeIcon"
                        onClick={() =>
                          removeItemFromBasket(item?.productId?._id)
                        }
                      />
                    </div>
                    <div className="sideBarCart__priceBox">
                      <Link to="/" className="sideBarCart__LinkText">
                        {item?.productId?.title}
                      </Link>
                      <div className="flex">
                        <bdi className="currentPrice">
                          {item?.productId?.price?.toLocaleString()}
                          <span className="toman">تومان</span>
                        </bdi>
                        <ProductCount
                          value={item?.cartQuantity ? item.cartQuantity : 1}
                          minValue={1}
                          maxValue={item?.productId?.quantity}
                          productId={item?.productId?._id}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="emptyBasket">
                <IoBagHandleOutline className="emptyBasket__icon" />
                <span className="emptyBasket__text">
                  {persianTexts.header.emptyBasket}
                </span>
              </div>
            )}

            <div className="sideBarCart__totalPriceAndLinks">
              <div className="flex ss02">
                <span>جمع كل سبد خريد : </span>
                <bdi className="currentPrice">
                  {basketInfo?.totalAmount?.toLocaleString()}
                  <span className="toman">تومان</span>
                </bdi>
              </div>
              <div className="sideBarCart__Links">
                <Link
                  className="sideBarCart__LinkBasket"
                  to="/basket"
                  onClick={() => setIsShowSideBarCart(false)}
                >
                  مشاهده سبد خرید
                </Link>
                <Link
                  className="sideBarCart__LinkBasket"
                  to="/basket/check-information"
                  onClick={() => setIsShowSideBarCart(false)}
                >
                  تسویه حساب
                </Link>
              </div>
            </div>
          </div>
          {/* end sidebar basket  */}

          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="header__logo-box">
                  <Link to="/">
                    <img
                      src="/images/logo.webp"
                      alt="logo-img"
                      className="header__logo-img"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="serach__wrapper" ref={searchRef}>
                  <form
                    className="searchBox"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <Link className="searchBox__btn" to="/">
                      <TfiSearch className="searchBox__iconSearch" />
                    </Link>
                    <input
                      type="text"
                      className="searchBox__input"
                      placeholder="کلید واژه مورد نظر..."
                    />

                    {showResult && (
                      <VscClose
                        className="search-box__btn--close"
                        onClick={() => setShowResult(false)}
                      />
                    )}

                    {showResult && (
                      <div className="search-box__result-wrapper">
                        {showLoader && (
                          <div className="search-box__loader"></div>
                        )}
                        {seeSearchResult ? (
                          <>
                            <div className="search-box__result-box">
                              <div className="search-box__result-banner">
                                <img
                                  src="/images/search-result.png"
                                  alt="Photo search result"
                                  className="search-box__result-img"
                                />
                              </div>
                              <div className="search-box__result-info">
                                <Link
                                  className="search-box__result-link"
                                  to="/"
                                >
                                  گوشی موبايل سامسونگ مدل Galaxy S8 Plus
                                  SM-G955FD دو سيم کارت
                                </Link>
                              </div>
                            </div>
                            <div className="search-box__result-box">
                              <div className="search-box__result-banner">
                                <img
                                  src="/images/search-result.png"
                                  alt="Photo search result"
                                  className="search-box__result-img"
                                />
                              </div>
                              <div className="search-box__result-info">
                                <Link
                                  className="search-box__result-link"
                                  to="/"
                                >
                                  گوشی موبايل سامسونگ مدل Galaxy S8 Plus
                                  SM-G955FD دو سيم کارت
                                </Link>
                              </div>
                            </div>
                            <div className="search-box__result-box">
                              <div className="search-box__result-banner">
                                <img
                                  src="/images/search-result.png"
                                  alt="Photo search result"
                                  className="search-box__result-img"
                                />
                              </div>
                              <div className="search-box__result-info">
                                <Link
                                  className="search-box__result-link"
                                  to="/"
                                >
                                  گوشی موبايل سامسونگ مدل Galaxy S8 Plus
                                  SM-G955FD دو سيم کارت
                                </Link>
                              </div>
                            </div>
                            <div className="search-box__result-btn">
                              <Link
                                to="/"
                                className="search-box__result-seeAll"
                              >
                                مشاهده همه نتایج
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="search-box__error-box">
                            <span>نتیجه ای یافت نشد</span>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                  <div className="searchBox__categoryBox">
                    <TbApps
                      className="searchBox__categoryIcon"
                      onClick={() => setShowCategory(!showCategory)}
                      ref={btnCategoryRef}
                    />
                  </div>
                  <div
                    className={`category ${
                      showCategory ? "category--show" : ""
                    }`}
                    ref={categoryRef}
                  >
                    <ul className="category__lists">
                      <li
                        className={`category__item ${
                          currentCategory === "all" && "category--current"
                        }`}
                        onClick={(e) => {
                          setCurrentCategory("all");
                          setShowCategory(false);
                        }}
                      >
                        تمام دسته ها
                      </li>
                      {menus.map((category) => (
                        <li
                          key={category.shortLink}
                          className={`category__item ${
                            currentCategory === category.shortLink &&
                            "category--current"
                          }`}
                          onClick={() => {
                            setCurrentCategory(category.shortLink);
                            setShowCategory(false);
                          }}
                        >
                          {category.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="header__leftBox">
                  {!auth?.token ? (
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
                      <span className="header__userName">خوش اومدی مسعود</span>
                      <ul className="header__userOptions">
                        {jwt_decode(auth?.token)?.role === "superAdmin" ||
                          (jwt_decode(auth?.token)?.role === "admin" && (
                            <li className="header__userOption"> 
                            <Link to="/adminpanel/dashboard">پنل مدیریت</Link>
                            </li>
                          ))}
                        <li className="header__userOption">حساب کاربری</li>
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
                    {basketInfo?.totalQTY ? (
                      <span className="basket__counter">
                        {basketInfo?.totalQTY}
                      </span>
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

          <div
            className={`mask ${isShowSideBarCart ? "mask--show" : ""}`}
            ref={maskRef}
            onClick={closeSideBarBasket}
          ></div>
          <div
            className={`sideBarCart ${
              isShowSideBarCart ? "sideBarCart--show" : ""
            }`}
            ref={sideBarCartRef}
          >
            <div className="sideBarCart__header">
              <div>
                <span>سبد خرید</span>
                <span className="sideBarCart__headerCount ss02">
                  {basketInfo?.totalQTY ? basketInfo.totalQTY : 0}
                </span>
              </div>
              <IoMdClose
                className="sideBarCart__headerCloseBtn"
                onClick={() => setIsShowSideBarCart(false)}
              />
            </div>
            {auth.token ? (
              <>
                {basketInfo?.cartItems?.length ? (
                  <ul className="sideBarCart__Lists">
                    {basketInfo?.cartItems?.map((item) => (
                      <li className="sideBarCart__ListsItem" key={item._id}>
                        <div className="sideBarCart__imgBox">
                          <Link to="/" className="sideBarCart__Link">
                            <img
                              src={`http://localhost:8000${item?.productId?.image}`}
                              alt="mini image products"
                              className="sideBarCart__img"
                            />
                          </Link>
                          <CgCloseO
                            className="sideBarCart__removeIcon"
                            onClick={() =>
                              removeItemFromBasket(item?.productId?._id)
                            }
                          />
                        </div>
                        <div className="sideBarCart__priceBox">
                          <Link to="/" className="sideBarCart__LinkText">
                            {item?.productId?.title}
                          </Link>
                          <div className="flex">
                            <bdi className="currentPrice">
                              {item?.productId?.price?.toLocaleString()}
                              <span className="toman">تومان</span>
                            </bdi>
                            <ProductCount
                              value={item?.cartQuantity ? item.cartQuantity : 1}
                              minValue={1}
                              maxValue={item?.productId?.quantity}
                              productId={item?.productId?._id}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="emptyBasket">
                    <IoBagHandleOutline className="emptyBasket__icon" />
                    <span className="emptyBasket__text">
                      {persianTexts.header.emptyBasket}
                    </span>
                  </div>
                )}

                <div className="sideBarCart__totalPriceAndLinks">
                  <div className="flex ss02">
                    <span>جمع كل سبد خريد : </span>
                    <bdi className="currentPrice">
                      {basketInfo?.totalAmount?.toLocaleString()}
                      <span className="toman">تومان</span>
                    </bdi>
                  </div>
                  <div className="sideBarCart__Links">
                    <Link
                      className="sideBarCart__LinkBasket"
                      to="/basket"
                      onClick={() => setIsShowSideBarCart(false)}
                    >
                      مشاهده سبد خرید
                    </Link>
                    <Link
                      className="sideBarCart__LinkBasket"
                      to="/basket/check-information"
                      onClick={() => setIsShowSideBarCart(false)}
                    >
                      تسویه حساب
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="emptyBasket">
                <IoBagHandleOutline className="emptyBasket__icon" />
                <span className="emptyBasket__text">
                  {persianTexts.header.notLoginInBasket}
                </span>
              </div>
            )}
          </div>
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
                  <MobileMenuItem {...menu} />
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
                  {!auth?.token ? (
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
                        <li className="header__userOption">حساب کاربری</li>
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
                    className="mobileHeader__basket"
                    onClick={() => setIsShowSideBarCart(true)}
                  >
                    <FiShoppingBag className="mobileHeader__basketIcon" />
                    {basketInfo?.totalQTY ? (
                      <span className="mobileHeader__basketCounter ss02">
                        {basketInfo?.totalQTY}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">

                  {/* {showResult && (
                    <div className="search-box__result-wrapper">
                      {showLoader && <div className="search-box__loader"></div>}
                      {seeSearchResult ? (
                        <>
                          <div className="search-box__result-box">
                            <div className="search-box__result-banner">
                              <img
                                src="/images/search-result.png"
                                alt="Photo search result"
                                className="search-box__result-img"
                              />
                            </div>
                            <div className="search-box__result-info">
                              <Link className="search-box__result-link" to="/">
                                گوشی موبايل سامسونگ مدل Galaxy S8 Plus SM-G955FD
                                دو سيم کارت
                              </Link>
                            </div>
                          </div>
                          <div className="search-box__result-box">
                            <div className="search-box__result-banner">
                              <img
                                src="/images/search-result.png"
                                alt="Photo search result"
                                className="search-box__result-img"
                              />
                            </div>
                            <div className="search-box__result-info">
                              <Link className="search-box__result-link" to="/">
                                گوشی موبايل سامسونگ مدل Galaxy S8 Plus SM-G955FD
                                دو سيم کارت
                              </Link>
                            </div>
                          </div>
                          <div className="search-box__result-box">
                            <div className="search-box__result-banner">
                              <img
                                src="/images/search-result.png"
                                alt="Photo search result"
                                className="search-box__result-img"
                              />
                            </div>
                            <div className="search-box__result-info">
                              <Link className="search-box__result-link" to="/">
                                گوشی موبايل سامسونگ مدل Galaxy S8 Plus SM-G955FD
                                دو سيم کارت
                              </Link>
                            </div>
                          </div>
                          <div className="search-box__result-btn">
                            <Link to="/" className="search-box__result-seeAll">
                              مشاهده همه نتایج
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="search-box__error-box">
                          <span>نتیجه ای یافت نشد</span>
                        </div>
                      )}
                    </div>
                  )} */}
  
                <div className="serach__wrapper" ref={searchRef}>
                  <form
                    className="searchBox"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <Link className="searchBox__btn" to="/">
                      <TfiSearch className="searchBox__iconSearch" />
                    </Link>
                    <input
                      type="text"
                      className="searchBox__input"
                      placeholder="کلید واژه مورد نظر..."
                    />

                    {showResult && (
                      <VscClose
                        className="search-box__btn--close"
                        onClick={() => setShowResult(false)}
                      />
                    )}

                    {showResult && (
                      <div className="search-box__result-wrapper">
                        {showLoader && (
                          <div className="search-box__loader"></div>
                        )}
                        {seeSearchResult ? (
                          <>
                            <div className="search-box__result-box">
                              <div className="search-box__result-banner">
                                <img
                                  src="/images/search-result.png"
                                  alt="Photo search result"
                                  className="search-box__result-img"
                                />
                              </div>
                              <div className="search-box__result-info">
                                <Link
                                  className="search-box__result-link"
                                  to="/"
                                >
                                  گوشی موبايل سامسونگ مدل Galaxy S8 Plus
                                  SM-G955FD دو سيم کارت
                                </Link>
                              </div>
                            </div>
                            <div className="search-box__result-box">
                              <div className="search-box__result-banner">
                                <img
                                  src="/images/search-result.png"
                                  alt="Photo search result"
                                  className="search-box__result-img"
                                />
                              </div>
                              <div className="search-box__result-info">
                                <Link
                                  className="search-box__result-link"
                                  to="/"
                                >
                                  گوشی موبايل سامسونگ مدل Galaxy S8 Plus
                                  SM-G955FD دو سيم کارت
                                </Link>
                              </div>
                            </div>
                            <div className="search-box__result-box">
                              <div className="search-box__result-banner">
                                <img
                                  src="/images/search-result.png"
                                  alt="Photo search result"
                                  className="search-box__result-img"
                                />
                              </div>
                              <div className="search-box__result-info">
                                <Link
                                  className="search-box__result-link"
                                  to="/"
                                >
                                  گوشی موبايل سامسونگ مدل Galaxy S8 Plus
                                  SM-G955FD دو سيم کارت
                                </Link>
                              </div>
                            </div>
                            <div className="search-box__result-btn">
                              <Link
                                to="/"
                                className="search-box__result-seeAll"
                              >
                                مشاهده همه نتایج
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="search-box__error-box">
                            <span>نتیجه ای یافت نشد</span>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                  <div className="searchBox__categoryBox">
                    <TbApps
                      className="searchBox__categoryIcon"
                      onClick={() => setShowCategory(!showCategory)}
                      ref={btnCategoryRef}
                    />
                  </div>
                  <div
                    className={`category ${
                      showCategory ? "category--show" : ""
                    }`}
                    ref={categoryRef}
                  >
                    <ul className="category__lists">
                      <li
                        className={`category__item ${
                          currentCategory === "all" && "category--current"
                        }`}
                        onClick={(e) => {
                          setCurrentCategory("all");
                          setShowCategory(false);
                        }}
                      >
                        تمام دسته ها
                      </li>
                      {menus.map((category) => (
                        <li
                          key={category.shortLink}
                          className={`category__item ${
                            currentCategory === category.shortLink &&
                            "category--current"
                          }`}
                          onClick={() => {
                            setCurrentCategory(category.shortLink);
                            setShowCategory(false);
                          }}
                        >
                          {category.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
