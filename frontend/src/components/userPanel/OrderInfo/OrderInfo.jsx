//packages
import { useParams } from "react-router-dom";
//rtk query
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
import { useGetOrdersQuery } from "../../../features/order/orderApiSlice";
//components
import Loader from "../../Loader/Loader";
//hooks
import useAuth from "../../../hooks/useAuth";
import useConvertDate from "../../../hooks/useConvertDate";
import useTitle from "../../../hooks/useTitle";
//icons
import { BiHash } from "react-icons/bi";
import { BsCalendar2Event } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { HiOutlineTicket } from "react-icons/hi";
import { GrMapLocation } from "react-icons/gr";
//styles
import "./OrderInfo.css";

const OrderInfo = () => {
  const { orderId } = useParams();
  const { userID } = useAuth();
  const { data: orders, isLoading:ordersLoading, isSuccess:ordersSuccess } = useGetOrdersQuery(userID);
  const { data: userData, isLoading, isSuccess } = useGetUserByIdQuery(userID);
  let orderDetails;
  if (ordersSuccess) {
    orderDetails = orders?.find((order) => order._id === orderId);
  }
  useTitle("جزئیات سفارش")
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <section className="order-info ss02">
          {/* start header */}
          <div className="order-info__details">
            <span>
              <BiHash className="order-info__icon" />
              شناسه :<span>{orderDetails._id}</span>
            </span>
            <span>
              <BsCalendar2Event className="order-info__icon" />
              تارخ ثبت :<span>{useConvertDate(orderDetails.createdAt)}</span>
            </span>
            <span>
              <GoTasklist className="order-info__icon" />
              وضعیت :
              <span>
                {orderDetails.status==="pending"?"در انتظار بررسی":orderDetails.status==="delivered"?"تایید شده":"رد شده"}
              </span>
            </span>
          </div>
          {/* end header */}
          {/* start table */}
          <h3 className="order-info__header-title">
            <HiOutlineTicket className="order-info__title-icon" />
            مشخصات سفارش
          </h3>
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
                    {orderDetails.productId.title}
                  </td>
                  <td data-title="قیمت">{orderDetails.productId.price.toLocaleString()} تومان</td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td>جمع كل سبد خريد:</td>
                  <td data-title="جمع كل سبد خريد:">{orderDetails.productId.price.toLocaleString()} تومان</td>
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
                <span>{userData?.name??"بدون نام"}</span>
              </p>
              <p>
                <span>آدرس : </span>
                <span>
                استان {userData?.addresses?.[0]?.state} ،
                {userData?.addresses?.[0]?.city} ،
                {userData?.addresses?.[0]?.street}
                
                </span>
              </p>
              <p>
                <span>کد پستی :</span>
                <span>{userData?.addresses?.[0]?.postalCode}</span>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderInfo;
