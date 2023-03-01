import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { TfiSearch } from "react-icons/tfi";
import { TbApps } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import {
  AiFillCloseCircle,
  AiOutlineCloseCircle,
  AiOutlineHome,
} from "react-icons/ai";
import { IoIosLaptop, IoMdClose } from "react-icons/io";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { RiUserHeartLine } from "react-icons/ri";
import { TbBabyCarriage } from "react-icons/tb";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { FaToolbox } from "react-icons/fa";
import { FiPhoneCall, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiChevronLeft } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgShoppingBag } from "react-icons/cg";
import { SiShopify } from "react-icons/si";
import { CgCloseO } from "react-icons/cg";
import token, { fetchDataFromApi } from "../../utils/api";

import "./Header.css";
import ProductCount from "../ProductCount/ProductCount";
import ProductsContext from "../../Context/ProductsContext";
import Navbar from "../Navbar/Navbar";
import { menus } from "../../Constants";
const MobileMenuItem = ({ menu }) => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  console.log(menu);
  return (
    <div
      className="mobileMenuLi"
      onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}
    >
      <Link className="mobileMenu__link" to={menu.link}>
        {menu.title}
      </Link>
      {menu.sub_categories.data.length ? (
        <>
          {!isShowMobileMenu ? (
            <FiChevronDown className="mobileMenu__dropdownIcon" />
          ) : (
            <FiChevronUp className="mobileMenu__dropdownIcon" />
          )}
          <ul
            className={`mobileMenu__submenu ${
              isShowMobileMenu && "mobileMenu__submenu--show"
            }`}
          >
            {menu.sub_categories.data.map((subMenu) => (
              <li className="mobileMenu__subItem" key={subMenu.id}>
                <Link
                  className="mobileMenu__subLink"
                  to={subMenu.attributes.link}
                >
                  {subMenu.attributes.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default function Header({ categories, isLoading }) {
  const [showCategory, setShowCategory] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [showLoader, setShowLoader] = useState(false);
  const [seeSearchResult, setSeeSearchResult] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState({ width: window.innerWidth });
  const [isShowSideBarCart, setIsShowSideBarCart] = useState(false);


  const categoryRef = useRef();
  const btnCategoryRef = useRef();
  const btnMobileCategoryRef = useRef();
  const mobileCategoryRef = useRef();
  const maskRef = useRef();
  const sideBarCartRef = useRef();
  const [count, setCount] = useState(1);
const productContext=useContext(ProductsContext)
  const resizaHandler = () => {
    setDeviceWidth({ width: window.innerWidth });
  };
  const closecategory = (e) => {
    if(showCategory){
      e.target !== categoryRef.current && e.target !== btnCategoryRef.current &&
      e.target !== btnMobileCategoryRef.current && e.target !== mobileCategoryRef.current && setShowCategory(false) 
    }
  };
  const closeSideBarBasket = (e) => {
    if (maskRef.current === e.target) {
      setIsShowSideBarCart(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener("click", closecategory);
    return () => {
      document.body.removeEventListener("click", closecategory);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizaHandler);
    return () => window.removeEventListener("resize", resizaHandler);
  }, []);

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
                <span className="sideBarCart__headerCount">2</span>
              </div>
              <IoMdClose
                className="sideBarCart__headerCloseBtn"
                onClick={() => setIsShowSideBarCart(false)}
              />
            </div>
            <ul className="sideBarCart__Lists">
              <li className="sideBarCart__ListsItem">
                <div className="sideBarCart__imgBox">
                  <Link to="/" className="sideBarCart__Link">
                    <img
                      src="./images/phone/samsung/13promax-1.jpg"
                      alt="mini image products"
                      className="sideBarCart__img"
                    />
                  </Link>
                  <CgCloseO className="sideBarCart__removeIcon" />
                </div>
                <div className="sideBarCart__priceBox">
                  <Link to="/" className="sideBarCart__LinkText">
                    گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128
                    گیگابایت
                  </Link>
                  <div className="flex">
                    <bdi className="currentPrice">
                      14,500,000
                      <span className="toman">تومان</span>
                    </bdi>
                    <ProductCount
                      value={count}
                      minValue={1}
                      maxValue={10}
                      newValue={setCount}
                    />
                  </div>
                </div>
              </li>
              <li className="sideBarCart__ListsItem">
                <div className="sideBarCart__imgBox">
                  <Link to="/" className="sideBarCart__Link">
                    <img
                      src="./images/phone/samsung/13promax-1.jpg"
                      alt="mini image products"
                      className="sideBarCart__img"
                    />
                  </Link>
                  <CgCloseO className="sideBarCart__removeIcon" />
                </div>
                <div className="sideBarCart__priceBox">
                  <Link to="/" className="sideBarCart__LinkText">
                    گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128
                    گیگابایت
                  </Link>
                  <div className="flex">
                    <bdi className="currentPrice">
                      14,500,000
                      <span className="toman">تومان</span>
                    </bdi>
                    <ProductCount
                      value={count}
                      minValue={1}
                      maxValue={10}
                      newValue={setCount}
                    />
                  </div>
                </div>
              </li>
            </ul>
            <div className="sideBarCart__totalPriceAndLinks">
              <div className="flex">
                <span>جمع كل سبد خريد : </span>
                <bdi className="currentPrice">
                  14,500,000
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
                <div className="serach__wrapper">
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
                  <div className="searchBox__categoryBox"  >
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
                        }}
                      >
                        تمام دسته ها
                      </li>
                      {menus.map((category) => (
                        <li
                        key={category.shortLink}
                          className={`category__item ${
                            currentCategory === category.shortLink && "category--current"
                        }`}
                          onClick={() =>setCurrentCategory(category.shortLink)}
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
                  <Link className="header__authUser" to="/login">
                    <div className="header__authUser-box">
                      <IoPersonOutline className="fullIcon" />
                    </div>
                    <span className="header__authUser-text">ورود / عضویت</span>
                  </Link>
                  <div
                    className="basket"
                    onClick={() => setIsShowSideBarCart(true)}
                  >
                    <SiShopify className="basket__icon" />
                    <span className="basket__counter">5</span>
                  </div>
                </div>
              </div>
            </div>
            <Navbar/>
          </div>
        </header>
      ) : (
        <header className="mobileHeader">
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
              {categories.map((menu) => (
                <li className="mobileMenu__item" key={menu.id}>
                  <MobileMenuItem menu={menu.attributes} />
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
                  <div className="mobileHeader__authBox">
                    <IoPersonOutline className="mobileHeader__authIcon fullIcon" />
                  </div>
                  <Link className="mobileHeader__basket" to="/">
                    <div className="mobileHeader__basketBox">
                      <CgShoppingBag className="mobileHeader__basketIcon fullIcon" />
                    </div>
                    <span className="mobileHeader__basketCounter">5</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <form className="searchBoxMobile" onSubmit={e=> e.preventDefault()}>
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
                      onClick={(e) => {
                        setShowResult(false);
                      }}
                    />
                  )}
                  <div className="searchBox__categoryBox">
                    <TbApps
                      className="searchBox__categoryIcon"
                      onClick={(e) =>setShowCategory(!showCategory)}
                      ref={btnMobileCategoryRef}

                    />
                  </div>
                  {!isLoading && showCategory && (
                    <div className={`category`} ref={mobileCategoryRef}>
                      <ul className="category__lists">
                        <li
                          className={`category__item ${
                            currentCategory === "all" && "category--current"
                          }`}
                          onClick={(e) => {
                            setCurrentCategory("all");
                          }}
                        >
                          تمام دسته ها
                        </li>
                        {menus.map((category) => (
                          <li
                          key={category.shortLink}
                            className={`category__item ${
                              category === category.shortLink &&
                              "category--current"
                            }`}
                            onClick={() => {
                              setCurrentCategory(category.shortLink);
                            }}
                          >
                            {category.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* {showCategory && (
                    <div className={`category`}>
                      <ul className="category__lists">
                        <li
                          className={`category__item ${
                            category === "all" && "category--current"
                          }`}
                          onClick={(e) => {
                            changeCategory(e);
                            setStatus(e.target.textContent);
                          }}
                        >
                          تمام دسته ها
                        </li>
                        <li
                          className={`category__item ${
                            category === "Electronic" && "category--current"
                          }`}
                          onClick={(e) => {
                            changeCategory(e);
                            setStatus(e.target.textContent);
                          }}
                        >
                          ابزار و الکترونیک
                        </li>
                        <li
                          className={`category__item ${
                            category === "Digital" && "category--current"
                          }`}
                          onClick={(e) => {
                            changeCategory(e);
                            setStatus(e.target.textContent);
                          }}
                        >
                          دیجیتال
                        </li>
                        <li
                          className={`category__item ${
                            category === "Beauty" && "category--current"
                          }`}
                          onClick={(e) => {
                            changeCategory(e);
                            setStatus(e.target.textContent);
                          }}
                        >
                          زیبایی و سلامت
                        </li>
                        <li
                          className={`category__item ${
                            category === "offer" && "category--current"
                          }`}
                          onClick={(e) => {
                            changeCategory(e);
                            setStatus(e.target.textContent);
                          }}
                        >
                          طرح تخفیف
                        </li>
                        <li
                          className={`category__item ${
                            category === "HomeAppliances" && "category--current"
                          }`}
                          onClick={(e) => {
                            changeCategory(e);
                            setStatus(e.target.textContent);
                          }}
                        >
                          لوازم خانگی
                        </li>
                        <li
                          className={`category__item ${
                            category === "Child" && "category--current"
                          }`}
                          onClick={(e) => {
                            changeCategory(e);
                            setStatus(e.target.textContent);
                          }}
                        >
                          مادر و کودک
                        </li>
                        <li
                          className={`category__item ${
                            category === "Sport" && "category--current"
                          }`}
                          onClick={(e) => {
                            setStatus(e.target.textContent);
                            changeCategory(e);
                          }}
                        >
                          ورزش و سرگرمی
                        </li>
                      </ul>
                    </div>
                  )} */}
                  {showResult && (
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
                  )}
                </form>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
