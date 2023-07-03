//packages
import { Link, useParams } from "react-router-dom";
//rtk query
import { useGetOrdersQuery } from "../../../features/order/orderApiSlice";
//hooks
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";
//icons
import { BsCheckSquare } from "react-icons/bs";
//styles
import "./SubmitOrder.css";
import { useEffect, useState } from "react";
import useConvertDate from "../../../hooks/useConvertDate";

function SubmitOrder() {
  const [orderDetails, setOrderDetails] = useState(null);
  const { userID } = useAuth();
  const { data: orders, isLoading, isSuccess } = useGetOrdersQuery(userID);
  const { oId } = useParams();
  useTitle("ثبت سفارش");
  console.log("orders", orders);

  console.log("orderDetails", orderDetails);
  let order;
  if (isSuccess) {
    order = orders.filter((order) => order._id === oId);
  }
  return (
    <>
      {order?.length && (
        <div className="submitOrder ss02">
          <div className="submitOrder__success">
            <BsCheckSquare className="submitOrder__success-icon" />
            <span>متشکریم، سفارش شما دریافت شد.</span>
          </div>
          <ul className="submitOrder__details">
            <li className="submitOrder__item">
              <span>شماره سفارش : </span>
              <span className="green-text">{order?.[0]?._id}</span>
            </li>
            <li className="submitOrder__item">
              <span>تاریخ : </span>
              <span>{useConvertDate(order?.[0]?.createdAt)}</span>
            </li>
            <li className="submitOrder__item">
              <span>قیمت نهایی : </span>
              <span>{order?.[0]?.productId?.price.toLocaleString()} تومان</span>
            </li>
          </ul>
          <div className="submitOrder__btns">
            <Link to="/" className="submitOrder__btn">
              بازگشت به صفحه اصلی
            </Link>
          </div>
          <div className="submitOrder__divider"></div>
        </div>
      )}
    </>
  );
}

export default SubmitOrder;
