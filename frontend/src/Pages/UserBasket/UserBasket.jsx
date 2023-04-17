import React from "react";
//packages
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

//icons
import { FaFileInvoiceDollar } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { TfiReceipt } from "react-icons/tfi";
//styles
import "./UserBasket.css";

function UserBasket() {
  const{checkinformation}=useParams()
  const {pathname}=useLocation()
  const basketCrumbs=pathname.split("/")
  return (
    <div className="container">
    <div className="row">
      <div className="col-12">
      <div className="backet">
        <div className="basket__crumbs">
            <div className="basket__checkSteps">
            <div className="basket__step">
                <HiShoppingBag className="basket__stepIcon" />
                <Link className="basket__stepTitle stepCurrent" to="/basket">سبد خرید</Link>
            </div>
            <div className="basket__step">
                <FaFileInvoiceDollar className="basket__stepIcon" />
                <Link className={`basket__stepTitle ${basketCrumbs.includes("check-information")?"stepCurrent":basketCrumbs.includes("order-pay")?"stepCurrent":""}`} to="/basket/check-information">جزئیات پرداخت</Link>
            </div>
            <div className="basket__step">
                <TfiReceipt className="basket__stepIcon" />
                <Link className={`basket__stepTitle ${basketCrumbs.includes("order-pay")?"stepCurrent":""}`} to="/basket/order-pay">تکمیل سفارش</Link>
            </div>
            </div>
        </div>
        
      </div>
      </div>
    </div>
      <div className="row">
        <Outlet/>
      </div>
    </div>
  );
}

export default UserBasket;
