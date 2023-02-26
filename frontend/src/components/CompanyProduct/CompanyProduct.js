import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import "./CompanyProduct.css";

export default function CompanyProduct({details}) {
  return (
    <div className="companyProduct">
      <Link to={details.link} className="companyProduct__link">
        <div className="CompanyProduct__banner">
          <img
            className="CompanyProduct__img"
            src={`http://localhost:1337${details.cover.data[0].attributes.url}`}
            alt="CompanyProduct image"
          />
        </div>
        <div className="CompanyProduct__info">
          <h3 className="CompanyProduct__title">
            {details.title}
          </h3>
          <div className="companyProduct__details">
            <div>
            {details.currentPrice ? 
            <>
            <del>
                <bdi className="productPrice">{details.price.toLocaleString()}</bdi>
                <span className="toman">تومان</span>
              </del>
              <bdi className="currentPrice">{details.currentPrice.toLocaleString()}</bdi>
              <span className="toman">تومان</span>
            </>
              : 
              <>
              <bdi className="currentPrice">{details.price.toLocaleString()}</bdi>
                <span className="toman">تومان</span>
              </>
              }
             
            </div>
            <div className="flex">
              <span className="starCount">4</span>
              <div className="starBox">
                <IoIosStar className="fullIcon fullStar" />
              </div>
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
