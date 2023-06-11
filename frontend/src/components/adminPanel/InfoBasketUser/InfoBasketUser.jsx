import { useEffect, useRef } from "react";
//components
import Error from "../../Error/Error";
//icons
import { IoCloseSharp } from "react-icons/io5";
//styles
import "./InfoBasketUser.css";
import { Tooltip } from "@mui/material";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
const InfoBasketUser = ({ details, setisShow }) => {

  const basketUserRef = useRef();
  useEffect(() => {
    const clickOutside = (e) => {
      if (basketUserRef.current === e.target) setisShow(false);
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);
  console.log("details",details);
  return (

    <>
      <div className="InfoBasketUser__mask" ref={basketUserRef}></div>
      <div className="InfoBasketUser">
      <div className="InfoBasketUser__closeBox">
      <IoCloseSharp className="InfoBasketUser__closeIcon" onClick={()=>setisShow(false)}/>
      </div>
        <ul className="basketUser__lists">
          {details?.cartItems?.length?<>{
            details.cartItems.map(item=> <li className="basketUser__item" key={item._id}>
            <img src={`http://localhost:8000${item.productId.image}`} alt="product in basket" className="basketUser__img" />
            <span className="basketUser__id ss02">
            آیدی محصول : 
            <Tooltip title={item.productId._id} className="setfont"><span>{item.productId._id}</span></Tooltip>
             </span>
            <span className="basketUser__count ss02">
            قیمت : 
            <span>{item.productId.price.toLocaleString()}</span>
             </span>
            <span className="basketUser__count ss02">
            تعداد : 
            <span>{item.cartQuantity}</span>
             </span>
            <Link to={`/product/${item._id}`}><FiEye /></Link>

          </li>)
          }</>:  <Error
                  title="سبد خرید کاربر خالی می باشد"
                  type="warning"
                />}
        </ul>
      </div>
    </>
  );
};

export default InfoBasketUser;
