import  { useState } from "react";
//packages
import { Link } from "react-router-dom";
//icons
import { TbDiscount2 } from "react-icons/tb";
//styles
import "./CheckInformation.css";

function CheckInformation() {
  const [showDiscount, setShowDiscount] = useState(false);
  return (
    <div className="col-12">
      <div className="information">
        <div className="useDiscount">
          <TbDiscount2 className="useDiscount__icon" />
          کد تخفیف دارید؟
          <span
            className="useDiscount__showContent"
            onClick={() => setShowDiscount(!showDiscount)}
          >
            برای نوشتن کد اینجا کلیک کنید
          </span>
        </div>
        <div
          className={`discountCode`}
          style={{ display: showDiscount ? "block" : "none" }}
        >
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
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="purchaerDetails">
              <h3 className="purchaerDetails__title">جزئیات صورتحساب</h3>
              <label
                htmlFor="purchaerName"
                className="purchaerDetails__label mandatory__label"
              >
                نام
              </label>
              <input
                type="text"
                name=""
                id="purchaerName"
                className="purchaerDetails__input"
              />
              <label
                htmlFor="purchaerFamily"
                className="purchaerDetails__label mandatory__label"
              >
                نام خانوادگی
              </label>
              <input
                type="text"
                name=""
                id="purchaerFamily"
                className="purchaerDetails__input"
              />
              <label
                htmlFor="purchaerCompanyName"
                className="purchaerDetails__label "
              >
                نام شرکت
              </label>
              <input
                type="text"
                name=""
                id="purchaerCompanyName"
                className="purchaerDetails__input"
              />
              <label
                htmlFor="purchaerprovince"
                className="purchaerDetails__label mandatory__label"
              >
                استان
              </label>
              <input
                type="text"
                name=""
                id="purchaerprovince"
                className="purchaerDetails__input"
              />
              <label
                htmlFor="purchaerCity"
                className="purchaerDetails__label mandatory__label"
              >
                شهر{" "}
              </label>
              <input
                type="text"
                name=""
                id="purchaerCity"
                className="purchaerDetails__input"
              />
              <label
                htmlFor="purchaerAddress"
                className="purchaerDetails__label mandatory__label"
              >
                آدرس
              </label>
              <input
                type="text"
                name=""
                id="purchaerAddress"
                className="purchaerDetails__input"
              />
              <label
                htmlFor="purchaerPostalCode"
                className="purchaerDetails__label mandatory__label"
              >
                کد پستی
              </label>
              <input
                type="text"
                name=""
                id="purchaerPostalCode"
                className="purchaerDetails__input"
              />
              <label
                htmlFor="purchaerPhone"
                className="purchaerDetails__label mandatory__label"
              >
                تلفن
              </label>
              <input
                type="text"
                name=""
                id="purchaerPhone"
                className="purchaerDetails__input"
              />
              <label
                htmlFor="purchaerName"
                className="purchaerDetails__label mandatory__label"
              >
                آدرس ایمیل
              </label>
              <input
                type="text"
                name=""
                id="purchaerName"
                className="purchaerDetails__input"
              />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <div className="detailsOrder">
              <h3 className="detailsOrder__title">سفارش شما</h3>
              <div className="orders">
                <table className="orders__table">
                  <thead>
                    <tr>
                      <th>محصول</th>
                      <th>قیمت</th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* {basketInfo?.cartItems?.map(item=> <tr key={item._id}>
                      <td>
                        {item?.productId?.title} <span>{item.cartQuantity?` x ${item.cartQuantity}`:null}</span>
                      </td>
                      <td>
                        <bdi className="productPrice">
                        {item?.productId?.price?.toLocaleString()}
                          <span className="toman">تومان</span>
                        </bdi>
                      </td>
                    </tr>)} */}
                   
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>جمع جزء</th>
                      <td>
                        <span>
                          <bdi className="productPrice">
                            {/* {basketInfo?.totalAmount?.toLocaleString()} */}
                            <span className="toman">تومان</span>
                          </bdi>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>هزینه حمل و نقل</th>
                      <td>
                      {/* {basketInfo?.totalAmount>1000000?" حمل و نقل رایگان":<span>
                          <bdi className="productPrice">
                            14,500,000
                            <span className="toman">تومان</span>
                          </bdi>
                        </span>}                        */}
                      </td>
                    </tr>
                    <tr>
                      <th>مجموع</th>
                      <td>
                        <span>
                          <bdi className="productPrice">
                          {/* {basketInfo?.totalAmount?.toLocaleString()} */}
                            <span className="toman">تومان</span>
                          </bdi>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>تخفیف شما از این خرید </th>
                      <td>
                        <span>
                          <bdi className="productPrice">
                            500,000
                            <span className="toman">تومان</span>
                          </bdi>
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
                <div className="submit__order">
                <div className="termsAndConditions">
                  <input
                    className="termsAndConditions__input"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  من شرایط و مقررات سایت را خوانده ام و آن را می پذیرم.
                </div>
                <Link to="/basket/order-pay" className="orderBtn">
                  ثبت سفارش
                </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckInformation;
