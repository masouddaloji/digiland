import React, { useState } from "react";
//packages
import { Link } from "react-router-dom";
//hooks
import useBasket from "../../hooks/useBasket";
//icons
import { IoIosStar, IoIosStarOutline, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GiScales } from "react-icons/gi";
//styles
import "./ProductCart.css";

export default function ProductCart(props) {
  const { _id, title, image, offPrice, price, rating, colors } = props;
  const { getUserBasket, addToBasketHandler } = useBasket();
  return (
    <div className="productBox">
        <div className="product__imgBox">
          <img
            src={`http://localhost:8000${image}`}
            alt="new product image"
            className="product__img"
          />
        </div>
      <Link to={`/product/${_id}`}>
        <h2 className="product__title" title={title}>
          {title}
        </h2>
        </Link>
        <div className="priceBox">
          <bdi className="currentPrice">
            {price.toLocaleString()}
            <span className="toman">تومان</span>
          </bdi>
        </div>
        <div className="product__quickAccessBox">
          <div className="product__rightBox">

            <div className="product__addToBasketBox mainHasTooltip" onClick={()=>addToBasketHandler(_id)}>
              <MdOutlineAddShoppingCart className="Product__addToBasketIcon" />
              <span className="tooltip">افزودن به سبد خرید</span>
            </div>

            <div className="product__iconBox mainHasTooltip">
              <IoMdHeartEmpty className="fullIcon" />
              <span className="tooltip">افزودن به علاقه مندی ها</span>
            </div>
          </div>
          <div className="product__leftBox">
            {Array(5 - rating)
              .fill(0)
              .map((item, index) => (
                <IoIosStarOutline className="star" />
              ))}
            {Array(rating)
              .fill(0)
              .map((item, index) => (
                <IoIosStar className="star" />
              ))}
          </div>
        </div>

    </div>
  );
}
