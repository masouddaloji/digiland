import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./SuggestedProductBox.css";

export default function SuggestedProductBox(props) {
  const {id,title,cover,productPrice,currentPrice,link,offerTime,percent}=props

  return (
    <div className="productBox">
      <h2 className="suggestedproduct__title">
        <Link className="suggestedproduct__link" to={link}>
          {title}
        </Link>
      </h2>
      <div className="product__imgBox">
      <Link to={link}>

        <img
          src={cover}
          alt=""
          className="product__img"
        />
      </Link>
      </div>
      <div className="suggestedproduct__priceBox">
        <del>
          <bdi className="productPrice">
          {productPrice.toLocaleString()}
          </bdi>
          <span className="toman">تومان</span>
        </del>
        <bdi className="currentPrice"> {currentPrice?.toLocaleString()}</bdi>
        <span className="toman">تومان</span>
      </div>
      <div className="suggestedproduct__time-Percent">
        <div className="suggestedproduct__percent">
          <span>{percent}%</span>
        </div>
        <div className="suggestedproduct__time">
          <span className="timer">38</span>:<span className="timer">08</span>:<span className="timer">35</span>:<span className="suggestedproduct__time-gold">12</span>
        </div>
        <div className="suggestedproduct__icon-box">
          <BsClockHistory className="fullIcon" />
        </div>
      </div>
    </div>
  );
}
