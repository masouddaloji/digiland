//packages
import { useParams } from "react-router-dom";
//styles
import "./OrderInfo.css";
import { BiHash } from "react-icons/bi";
import { BsCalendar2Event } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { HiOutlineTicket } from "react-icons/hi";
import { GrMapLocation } from "react-icons/gr";

const OrderInfo = () => {
  const { orderId } = useParams();
  console.log("orderId", orderId);
  return (
    <section className="order-info ss02">
      {/* start header */}
        <div className="order-info__details">
          <span>
            <BiHash className="order-info__icon" />
            شناسه :<span>101214161820</span>
          </span>
          <span>
            <BsCalendar2Event className="order-info__icon" />
            تارخ ثبت :<span>22 خرداد 1402</span>
          </span>
          <span>
            <GoTasklist className="order-info__icon" />
            وضعیت :<span>در انتظار بررسی</span>
          </span>
        </div>
        {/* end header */}

      {/* start table */}
      <h3 className="order-info__header-title">
        <HiOutlineTicket className="order-info__title-icon" />
        مشخصات سفارش
      </h3>
      {/* <div className="order-info__table__wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>محصول</th>
                                    <th>قیمت</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                    گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128 گیگابایت
                                    <span>2 x</span>
                                    </td>
                                    <td>
                                    16,000,000 تومان</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>جمع كل سبد خريد:</th>
                                    <td>16,000,000 تومان</td>
                                </tr>
                                <tr>
                                    <th>روش پرداخت:</th>
                                    <td>آنلاین</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div> */}

      <div className="user__table__wrapper">
        <table className="user__table">
          <thead>
            <tr>
              <th>محصول</th>
              <th>قیمت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-title="محصول">
                گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128
                گیگابایت
              </td>
              <td data-title="قیمت">16,000,000 تومان</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>جمع كل سبد خريد:</td>
              <td data-title="جمع كل سبد خريد:">16,000,000 تومان</td>
            </tr>
            <tr>
              <td>روش پرداخت:</td>
              <td data-title=" روش پرداخت:">آنلاین</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* end table */}

      <h3 className="order-info__header-title">
        <GrMapLocation className="order-info__title-icon" />
        آدرس حمل و نقل
      </h3>
      <div className="order-info__address">
        <div className="order-info__address-content">
          <p>
            <span>گیرنده : </span>
            <span>امیرعلی</span>
          </p>
          <p>
            <span>آدرس : </span>
            <span>استان لرستان ، شهرستان کوهدشت ، شهرک شهید رجایی</span>
          </p>
          <p>
            <span>کد پستی :</span>
            <span>6845142598</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderInfo;
