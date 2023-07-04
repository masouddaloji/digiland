import { useState } from "react";
//packages
import { Link } from "react-router-dom";
//rtk query
import { useGetBasketQuery } from "../../../features/basket/basketApiSlice";
//hooks
import useTitle from "../../../hooks/useTitle";
//components
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
import CartItem from "./CartItem";
//persian text
import { persianTexts } from "../../../text";
//icons
import { FaChevronLeft, FaShippingFast } from "react-icons/fa";
//styles
import "./Cart.css";
import Loader from "../../Loader/Loader";

function Cart() {
  useTitle("سبد خرید");
  const { data: basket, isLoading, isSuccess } = useGetBasketQuery();
  const [postPrice, setPostPrice] = useState(10000);
  return (
        <>
          {basket?.cartItems?.length ? (
            <div className="row">
              <div className="col-12 col-lg-9">
                <div className="cart">
                  <div className="cart__productsWrapper">
                    <div className="user__table__wrapper">
                      <table className="user__table">
                        <thead>
                          <tr>
                            <th></th>
                            <th></th>
                            <th>محصول</th>
                            <th>قیمت</th>
                            <th>تعداد</th>
                            <th>جمع جزء</th>
                          </tr>
                        </thead>
                        <tbody>
                          {basket.cartItems.map((item) => (
                            <CartItem {...item} key={item._id} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="discountCode">
                    <span className="discountCode__title">کدتخفیف</span>
                    <div className="discountCode__getCode">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="discountCode__input"
                        placeholder="کد تخفیف"
                      />
                      <button className="discountCode__btnSend">
                        اعمال کدتخفیف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="totalPrice">
                  <h3 className="totolaPrice__title">جمع کل سبد خرید</h3>
                  <div className="totolaPrice__postedWrapper">
                    <span className="totolaPrice__postText">
                      <FaShippingFast className="totolaPrice__icon" />
                    </span>
                    <span>
                      {basket.totalAmount > 10000000 ? (
                        "تبریک، ارسال به صورت رایگان"
                      ) : (
                        <bdi className="productPrice ss02">
                          {postPrice.toLocaleString()}
                          <span className="toman">تومان</span>
                        </bdi>
                      )}
                    </span>
                  </div>
                  <div className="totolaPrice__progress"></div>
                  <div className="totolaPrice__details">
                    <div className="totolaPrice__item">
                      <span>جمع جزء</span>
                      <bdi className="productPrice ss02">
                        {basket.totalAmount.toLocaleString()}
                        <span className="toman">تومان</span>
                      </bdi>
                    </div>
                    <div className="totolaPrice__item">
                      <span>مجموع</span>
                      <bdi className="productPrice ss02">
                        {basket.totalAmount?.toLocaleString()}
                        <span className="toman">تومان</span>
                      </bdi>
                    </div>
                    <div className="totolaPrice__item">
                      <span>تخفیف شما از این خرید</span>
                      <span className="productPriceDiscount">
                        <bdi className="productPrice ss02">
                          {1000}
                          <span className="toman">تومان</span>
                        </bdi>
                      </span>
                    </div>
                    <Link to="/check-information" className="totolaPrice__Link">
                      {persianTexts.basket.basketBtn}
                      <FaChevronLeft className="totolaPrice__LinkIcon" />
                      <FaChevronLeft className="totolaPrice__LinkIcon" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Error title={persianTexts.basket.emptyBasket} type="warning" />
          )}
</>
  );
}

export default Cart;
