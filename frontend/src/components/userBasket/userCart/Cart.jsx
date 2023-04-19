import React, { useState } from "react";
//packages
import { Link } from "react-router-dom";
//hooks
import useBasket from "../../../hooks/useBasket";
//compomemts
import ProductCount from "../../ProductCount/ProductCount";
//icons
import { FaChevronLeft, FaShippingFast } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
//styles
import "./Cart.css";

function Cart() {
  const { removeItemFromBasket, basketInfo } = useBasket();
  const [postPrice, setPostPrice] = useState(10000);
  return (
    <>
      <div className="col-9">
        <div className="cart">
          <div className="cart__productsWrapper">
            <table className="cart__table">
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
                {basketInfo?.cartItems?.length ? (
                  <>
                    {basketInfo?.cartItems?.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <IoMdClose
                            className="cart__removeIcon"
                            onClick={() =>
                              removeItemFromBasket(item?.productId?._id)
                            }
                          />
                        </td>
                        <td>
                          <Link
                            to={`/product/${item?.productId?._id}`}
                            className="cart__productImglink"
                          >
                            <img
                              src={`http://localhost:8000${item?.productId?.image}`}
                              alt="image products"
                              className="cart__productImg"
                            />
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="cart__productName"
                            to={`/product/${item?.productId?._id}`}
                          >
                            {item?.productId?.title}
                          </Link>
                        </td>
                        <td>
                          <bdi className="currentPrice">
                            {item?.productId?.price?.toLocaleString()}
                            <span className="toman">تومان</span>
                          </bdi>
                        </td>
                        <td>
                          <ProductCount
                            value={item?.cartQuantity ? item.cartQuantity : 1}
                            minValue={1}
                            maxValue={item?.productId?.quantity}
                            productId={item?.productId?._id}
                          />
                          <div className="cart__btnsCount">
                            <buttom className="cart__btnCount"></buttom>
                            <buttom className="cart__btnCount"></buttom>
                          </div>
                        </td>
                        <td>
                          <bdi className="currentPrice changeable">
                            {(
                              item?.cartQuantity * item?.productId?.price
                            ).toLocaleString()}
                            <span className="toman">تومان</span>
                          </bdi>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : null}
              </tbody>
            </table>
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
              <button className="discountCode__btnSend">اعمال کدتخفیف</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3">
        <div className="totalPrice">
          <h3 className="totolaPrice__title">جمع کل سبد خرید</h3>
          <div className="totolaPrice__postedWrapper">
            <span className="totolaPrice__postText">
              <FaShippingFast className="totolaPrice__icon" />
              هزینه ارسال
            </span>
            <span className="totolaPrice__postPrice">
              {basketInfo?.totalAmount > 1000000 ? (
                "تبریک، ارسال به صورت رایگان"
              ) : (
                <bdi className="productPrice">
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
              <bdi className="productPrice">
                {basketInfo?.totalAmount?.toLocaleString()}
                <span className="toman">تومان</span>
              </bdi>
            </div>
            <div className="totolaPrice__item">
              <span>مجموع</span>
              <bdi className="productPrice">
                {basketInfo?.totalAmount?.toLocaleString()}
                <span className="toman">تومان</span>
              </bdi>
            </div>
            <div className="totolaPrice__item">
              <span>تخفیف شما از این خرید</span>
              <span className="productPriceDiscount">
                <bdi className="productPrice">
                  {1000}
                  <span className="toman">تومان</span>
                </bdi>
              </span>
            </div>
            <Link to="/basket/check-information" className="totolaPrice__Link">
              ادامه جهت تسویه حساب
              <FaChevronLeft className="totolaPrice__LinkIcon" />
              <FaChevronLeft className="totolaPrice__LinkIcon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
