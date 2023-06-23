//packages
import { Link } from "react-router-dom";
//hooks
import useTitle from "../../../hooks/useTitle";
//styles
import "./SubmitOrder.css";

function SubmitOrder() {
  useTitle("ثبت سفارش")
  return (
    <div className="row">
      <div className="col-12">
        <div className="submitOrder">
          <ul className="submitOrder__details">
            <li className="submitOrder__item">
              <span>شماره سفارش : </span>
              <strong>3619212</strong>
            </li>
            <li className="submitOrder__item">
              <span>تاریخ : </span>
              <strong>3619212</strong>
            </li>
            <li className="submitOrder__item">
              <span>قیمت نهایی : </span>
              <bdi className="productPrice">
                500,000
                <span className="toman">تومان</span>
              </bdi>
            </li>
          </ul>
          <div className="submitOrder__btns">
            <Link to="/" className="submitOrder__btn submitOrder__btn--submit">
              پرداخت
            </Link>
            <Link
              to="/basket/check-information"
              className="submitOrder__btn submitOrder__btn--return"
            >
              بازگشت
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitOrder;
