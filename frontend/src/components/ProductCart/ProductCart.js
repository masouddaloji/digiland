import React, { useState } from "react";
//packages
import { Link } from "react-router-dom";

//icons
import { IoIosStar, IoIosStarOutline, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GiScales } from "react-icons/gi";
//styles
import "./ProductCart.css";

export default function ProductCart(props) {
const{_id,title,image,offPrice,price,rating,colors}=props
  return (
     <div className="productBox">
     <Link to={`/product/${_id}`}>
     <div className="product__imgBox">
 <img src={`http://localhost:8000${image}`} alt="new product image" className="product__img" />
       </div>
       <h2 className="product__title">
      {title}
       </h2>
       <div className="priceBox">
         <bdi className="currentPrice">{price.toLocaleString()}
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
