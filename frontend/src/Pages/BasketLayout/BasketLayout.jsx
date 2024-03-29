//packages
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
//rtk query
import { useGetBasketQuery } from "../../features/basket/basketApiSlice";
//components
import Loader from "../../components/Loader/Loader";
//icons
import { FaFileInvoiceDollar } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { TfiReceipt } from "react-icons/tfi";
//styles
import "./BasketLayout.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function BasketLayout() {
  const { data: basket, isLoading, isSuccess } = useGetBasketQuery();
  const { pathname } = useLocation();
  const basketCrumbs = pathname.split("/");

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="backet">
                  <div className="basket__crumbs">
                    <div className="basket__checkSteps">
                      <div className="basket__step">
                        <HiShoppingBag className="basket__stepIcon" />
                        <Link
                          className="basket__stepTitle stepCurrent"
                          to="/basket"
                        >
                          سبد خرید
                        </Link>
                      </div>
                      <div className="basket__step">
                        <FaFileInvoiceDollar className="basket__stepIcon" />
                        {basket?.cartItems?.length ? (
                          <Link
                            className={`basket__stepTitle ${
                              basketCrumbs?.includes("check-information") &&
                              "stepCurrent"
                            }`}
                            to="/check-information"
                          >
                            جزئیات پرداخت
                          </Link>
                        ) : (
                          <span className="basket__stepTitle">
                            جزئیات پرداخت
                          </span>
                        )}
                      </div>
                      <div className="basket__step">
                        <TfiReceipt className="basket__stepIcon" />
                        {basket?.cartItems?.length ? (
                          <Link
                            className={`basket__stepTitle ${
                              pathname.includes("order-pay") && "stepCurrent"
                            }`}
                            to="/order-pay"
                          >
                            تکمیل سفارش
                          </Link>
                        ) : (
                          <span className="basket__stepTitle">تکمیل سفارش</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="basket__wrapper">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default BasketLayout;
