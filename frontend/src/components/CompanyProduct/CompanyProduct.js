import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import "./CompanyProduct.css";

export default function CompanyProduct(props) {
  console.log(props)
  const{_id,title,image,price,offPrice,rating}=props
  return (
    <div className="companyProduct">
      <Link to={`/product/${_id}`} className="companyProduct__link">
        <div className="CompanyProduct__banner">
          <img
            className="CompanyProduct__img"
            src={`http://localhost:8000${image}`}
            alt="CompanyProduct image"
          />
        </div>
        <div className="CompanyProduct__info">
          <h3 className="CompanyProduct__title">
            {title}
          </h3>
          <div className="companyProduct__details">
            <div>
            {offPrice ? 
            <>
            <del>
                <bdi className="productPrice">{price.toLocaleString()}</bdi>
              </del>
              <bdi className="currentPrice">{(price-((price*offPrice)/100)).toLocaleString()}</bdi>
              <span className="toman">تومان</span>
            </>
              : 
              <>
              <bdi className="currentPrice">{price.toLocaleString()}</bdi>
                <span className="toman">تومان</span>
              </>
              }
             
            </div>
                <div className="starDetails">
                <IoIosStar className="star small__star" />
                <span>{rating}</span>
                </div>
          </div>
        </div>
        <div className="companyProduct__hoverBox">
          <div className="companyProduct__iconBox">
            <AiOutlineSearch />
          </div>
        </div>
      </Link>
    </div>
  );
}
