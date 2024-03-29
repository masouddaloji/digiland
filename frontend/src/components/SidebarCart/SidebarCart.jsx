import { useRef } from "react";
//packages
import { Link } from "react-router-dom";

//rtk query
import { useGetBasketQuery } from "../../features/basket/basketApiSlice";
//components
import SidebarCartItem from "../SidebarCartItem/SidebarCartItem";
//hooks
import useAuth from "../../hooks/useAuth";
import useOutsideClick from "../../hooks/useOutsideClick";
//icons
import { IoMdClose } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
//persiantext
import { persianTexts } from "../../text";
//styles
import "./SidebarCart.css";

const SidebarCart = ({ isShowSideBarCart, setIsShowSideBarCart }) => {
  const { userName,token } = useAuth();
  const {
    data: baskets,
    isLoading: basketLoading,
    isSuccess: basketSuccess,
    isError: basketError,
  } = useGetBasketQuery(undefined,{
    skip:!token
  });
  const maskRef = useRef();
  const sideBarCartRef = useRef();

  
  useOutsideClick({ref:maskRef,setStateHandler:setIsShowSideBarCart})
  return (
    <>
      <div
        className={`mask ${isShowSideBarCart ? "mask--show" : ""}`}
        ref={maskRef}
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
              {userName ? baskets?.totalQTY ?? 0 : 0}
            </span>
          </div>
          <IoMdClose
            className="sideBarCart__headerCloseBtn"
            onClick={() => setIsShowSideBarCart(false)}
          />
        </div>
        {userName ? (
          <>
            {baskets?.cartItems?.length > 0 ? (
              <ul className="sideBarCart__Lists">
                {baskets.cartItems.map((item) => (
                  <SidebarCartItem {...item} key={item._id} />
                ))}
              </ul>
            ) : (
              <div className="emptyBasket">
                <IoBagHandleOutline className="emptyBasket__icon" />
                <Link className="emptyBasket__text" to="/login">
                  {persianTexts.basket.emptyBasket}
                </Link>
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
                  to="/check-information"
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
            <Link className="emptyBasket__text" to="/login">
              {persianTexts.header.notLoginInBasket}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarCart;
