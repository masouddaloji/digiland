import React from "react";
//packages
import { Link } from "react-router-dom";

//styles
import "./instantOffer.css";

const InstantOffer = (props) => {
  const { _id, title, image, offPrice, price, rating } = props;
  return (
    <div className="instantOffer">
      <div className="instantOffer__titleBox">
        <span className="instantOffer__title">پیشنهاد لحظه ای</span>
      </div>
      <div className="instantOffer__imgBox">
        <img
          src={`http://localhost:8000${image}`}
          alt="instantOffer image"
          className="instantOffer__img"
        />
      </div>
      <Link className="instantOffer__ProductName" title={title} to={`product/${_id}`}>
        {title}
      </Link>
      <div className="priceBox ss02">
        <del>
          <bdi className="productPrice">{price}</bdi>
        </del>
        <span>
        <bdi className="currentPrice">
          {(price - (price * offPrice) / 100).toLocaleString()}
        </bdi>
        <span className="toman">تومان</span>
        </span>
      </div>
    </div>
  );
};

export default InstantOffer;
