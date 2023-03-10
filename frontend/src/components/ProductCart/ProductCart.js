import React, { useState } from "react";
import { IoIosStar, IoIosStarOutline, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GiScales } from "react-icons/gi";
import { Link } from "react-router-dom";

import "./ProductCart.css";

export default function ProductCart({details}) {

  return (
     <div className="productBox">
     <Link to={details.link}>
     <div className="product__imgBox">
 <img src={`http://localhost:1337${details.cover.data[0].attributes.url}`} alt="" className="product__img" />
       </div>
       <h2 className="product__title">
      {details.title}
       </h2>
       <div className="priceBox">
         <bdi className="currentPrice">{details.price.toLocaleString()}
         <span className="toman">تومان</span>
         </bdi>
        
       </div>
       <div className="product__quickAccessBox">
         <div className="product__rightBox">
         <Link to="/">
           <div className="product__addToBasketBox mainHasTooltip" >
             <MdOutlineAddShoppingCart className="Product__addToBasketIcon" />
             <span className="tooltip">افزودن به سبد خرید</span>
           </div>

         </Link>
           <Link to="/">
           <div className="product__iconBox mainHasTooltip">
             <GiScales className="fullIcon"/>
             <span className="tooltip">مقایسه</span>

           </div>

          </Link>
          <Link to="/">
          <div className="product__iconBox mainHasTooltip">
            <IoMdHeartEmpty className="fullIcon"/>
            <span className="tooltip">افزودن به علاقه مندی ها</span>

           </div>

           </Link>

         </div>
         <div className="product__leftBox">
           <div className="starBox">
             <IoIosStarOutline className="fullIcon emptyStar"/>
           </div>
           <div className="starBox">
             <IoIosStarOutline className="fullIcon emptyStar"/>
           </div>
           <div className="starBox">
             <IoIosStarOutline className="fullIcon emptyStar"/>
           </div>
           <div className="starBox">
             <IoIosStar className="fullIcon fullStar"/>
           </div>
           <div className="starBox">
             <IoIosStar className="fullIcon fullStar"/>
           </div>
         </div>
       </div>
     </Link>
     
     </div>
  );
}
