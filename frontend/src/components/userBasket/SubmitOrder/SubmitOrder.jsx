//packages
import { Link, useParams } from "react-router-dom";
//rtk query
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
//hooks
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";
//styles
import "./SubmitOrder.css";
import { BsCheckSquare } from "react-icons/bs";

function SubmitOrder() {
  const { oId } = useParams();
  useTitle("ثبت سفارش");
  const { userID } = useAuth();
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(userID);
  return (
    <div className="submitOrder ss02">
      <div className="submitOrder__success">
        <BsCheckSquare className="submitOrder__success-icon" />
        <span>متشکریم، سفارش شما دریافت شد.</span>
      </div>
      <ul className="submitOrder__details">
        <li className="submitOrder__item">
          <span>شماره سفارش : </span>
          <span className="green-text">3619212</span>
        </li>
        <li className="submitOrder__item">
          <span>تاریخ : </span>
          <span>22 خرداد 1402</span>
        </li>
        <li className="submitOrder__item">
          <span>قیمت نهایی : </span>
          <span>16,000,000 تومان</span>
        </li>
      </ul>
      <div className="submitOrder__btns">
        <Link to="/" className="submitOrder__btn">
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <div className="submitOrder__divider"></div>
    </div>
  );
}

export default SubmitOrder;
