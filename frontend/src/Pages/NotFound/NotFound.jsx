//hooks
import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
//styles
import "./NotFound.css";

const NotFound = () => {
  useTitle("صفحه مورد نظر یافت نشد");
  return (
    <section className="notFound">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className="notFound__content">
        <h2 className="notFound__title">
          <i>4</i>
          <i>0</i>
          <i>4</i>
        </h2>
        <div className="notFound__text">
        <p>
        صفحه مورد نظر یافت نشد که به چند دلیل این اتفاق افتاده است:

        </p>

        <span>
        آدرس صفحه تغییر کرده است.
        </span>
        <span>
        مطلب به طور کلی حذف شده است.
        </span>
        <span>
        مشکلی در دیتابیس بوجود آمده است.
        </span>
        </div>
        <Link to="/" className="notFound__link">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
