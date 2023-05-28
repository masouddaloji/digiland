import { useState, useEffect, useRef } from "react";
// packages
import { Link } from "react-router-dom";
// components
import Navbar from "../Navbar/Navbar";
import MobileMenuItem from "./MobileMenuItem";
import ProductCount from "../ProductCount/ProductCount";
import Spiner from "../Spiner/Spiner";
import Search from "../Search/Search";
import { toast } from "react-toastify";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getBasket, multiRemoveFromBasket } from "../../features/basketSlice";
import { selectToken } from "../../features/auth/authSlice";
//rtk query
import { useLogOutUserMutation } from "../../features/auth/authApiSlice";
import { useGetBasketQuery } from "../../features/basket/basketApiSlice";
//hooks
import useAuth from "../../hooks/useAuth";

// icons
import { IoBagHandleOutline, IoPersonOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
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

export default function Header({}) {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const { userName, userRole } = useAuth();
  const [logOutUser] = useLogOutUserMutation();
  const {
    data: baskets,
    isLoading: basketLoading,
    isSuccess: basketSuccess,
    isError: basketError,
  } = useGetBasketQuery();

  console.log("baskets", baskets);
  const { datas, status, error, updateBasketStatus, removeFromBasketStatus } =
    useSelector((state) => state.basket);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState({ width: window.innerWidth });
  const [isShowSideBarCart, setIsShowSideBarCart] = useState(false);
  const maskRef = useRef();
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
    logOutUser()
      .unwrap()
      .then(() => {
        toast.success(persianTexts.useLogout.logoutSuccess);
      })
      .catch((error) => {
        toast.error(persianTexts.useLogout.logoutError);
      });
  };
  const removeProductFromBasketHandler = (id) => {
    dispatch(multiRemoveFromBasket({ id, token: token })).then(() =>
      dispatch(getBasket(token))
    );
  };

  useEffect(() => {
    window.addEventListener("resize", resizaHandler);
    return () => window.removeEventListener("resize", resizaHandler);
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(getBasket(token));
    }
  }, [token]);

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
                  {baskets?.totalQTY}
                </span>
              </div>
              <IoMdClose
                className="sideBarCart__headerCloseBtn"
                onClick={() => setIsShowSideBarCart(false)}
              />
            </div>
            {baskets?.cartItems?.length > 0 ? (
              <ul className="sideBarCart__Lists">
                {baskets.cartItems.map((item) => (
                  <li className="sideBarCart__ListsItem" key={item._id}>
                  <>
                        {" "}
                        <div className="sideBarCart__imgBox">
                          <Link
                            to={`/product/${item._id}`}
                            className="sideBarCart__Link"
                          >
                            <img
                              src={`http://localhost:8000${item?.productId?.image}`}
                              alt="mini image products"
                              className="sideBarCart__img"
                            />
                          </Link>
                          <CgCloseO
                            className="sideBarCart__removeIcon"
                            onClick={() =>
                              removeProductFromBasketHandler(
                                item?.productId?._id
                              )
                            }
                          />
                        </div>
                        <div className="sideBarCart__priceBox">
                          <Link to="/" className="sideBarCart__LinkText">
                            {item?.productId?.title}
                          </Link>
                          <div className="flex">
                            <bdi className="currentPrice ss02">
                              {item?.productId?.price?.toLocaleString()}
                              <span className="toman">تومان</span>
                            </bdi>
                            <ProductCount
                              value={item?.cartQuantity ?? 1}
                              minValue={1}
                              maxValue={item?.productId?.quantity}
                              productId={item?.productId?._id}
                            />
                          </div>
                        </div>
                      </>
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
                  {baskets?.totalAmount?.toLocaleString()}
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
                <Search />
              </div>
              <div className="col-lg-3">
                <div className="header__leftBox">
                  {!token ? (
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
                            <Link to="/adminpanel/dashboard">پنل مدیریت</Link>
                          </li>
                        ) : null}
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
                    {baskets?.totalQTY ? (
                      <span className="basket__counter">
                        {baskets.totalQTY}
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
                  {baskets?.totalQTY ?? 0}
                </span>
              </div>
              <IoMdClose
                className="sideBarCart__headerCloseBtn"
                onClick={() => setIsShowSideBarCart(false)}
              />
            </div>
            {token ? (
              <>
                {baskets?.cartItems?.length ? (
                  <ul className="sideBarCart__Lists">
                    {baskets.cartItems.map((item) => (
                      <li className="sideBarCart__ListsItem" key={item._id}>
                        <div className="sideBarCart__imgBox">
                          <Link
                            to={`/product/${item._id}`}
                            className="sideBarCart__Link"
                          >
                            <img
                              src={`http://localhost:8000${item?.productId?.image}`}
                              alt="mini image products"
                              className="sideBarCart__img"
                            />
                          </Link>
                          <CgCloseO
                            className="sideBarCart__removeIcon"
                            onClick={() =>
                              removeProductFromBasketHandler(
                                item?.productId?._id
                              )
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
                              value={item?.cartQuantity ?? 1}
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
                      {baskets?.totalAmount?.toLocaleString()}
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
                  {!token ? (
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
                        {userRole === "superAdmin" || userRole === "admin" ? (
                          <li className="header__userOption">
                            <Link to="/adminpanel/dashboard">پنل مدیریت</Link>
                          </li>
                        ) : null}
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
                    {baskets?.totalQTY ? (
                      <span className="mobileHeader__basketCounter ss02">
                        {baskets?.totalQTY}
                      </span>
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
