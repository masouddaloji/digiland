import { useEffect, useRef } from "react";
//components
import Error from "../../Error/Error";
//hooks
import useOutsideClick from "../../../hooks/useOutsideClick";
//icons
import { IoCloseSharp } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
//styles
import "./InfoBasketUser.css";

const InfoBasketUser = ({ details, setisShow }) => {
  const basketUserRef = useRef();

  useOutsideClick({ ref: basketUserRef, setStateHandler: setisShow });

  return (
    <>
      <div className="InfoBasketUser__mask" ref={basketUserRef}></div>
      <div className="InfoBasketUser">
        <div className="InfoBasketUser__closeBox">
          <IoCloseSharp
            className="InfoBasketUser__closeIcon"
            onClick={() => setisShow(false)}
          />
        </div>
        {details?.cartItems?.length ? (
          <div className="infoBasketUser__tableWrapper">
          <ul className="basketUser__lists">
            {details.cartItems.map((item) => (
              <li className="basketUser__item" key={item._id}>
                <img
                  src={`http://localhost:8000${item.productId.image}`}
                  alt="product in basket"
                  className="basketUser__img"
                />
                <span className="basketUser__title ss02">
                  محصول :
                  <Tooltip title={item.productId.title} className="setfont">
                    <span>{item.productId.title}</span>
                  </Tooltip>
                </span>
                <span className="basketUser__count ss02">
                  قیمت :<span>{item.productId.price.toLocaleString()}</span>
                </span>
                <span className="basketUser__count ss02">
                  تعداد :<span>{item.cartQuantity}</span>
                </span>
                <Link to={`/product/${item._id}`}>
                  <FiEye />
                </Link>
              </li>
            ))}
          </ul>
          </div>
        ) : (
          <Error title="سبد خرید کاربر خالی می باشد" type="warning" />
        )}
      </div>
    </>
  );
};

export default InfoBasketUser;

 