import { useEffect, useRef } from "react";
//components
import Error from "../../Error/Error";
//icons
import { IoCloseSharp } from "react-icons/io5";
//styles
import "./InfoBasketUser.css";
const InfoBasketUser = ({ details, setisShow }) => {

  const basketUserRef = useRef();
  useEffect(() => {
    const clickOutside = (e) => {
      if (basketUserRef.current === e.target) setisShow(false);
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);
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
            {/* <img src="" alt="product in basket" className="basketUser__img" /> */}
            <span className="basketUser__id ss02">
            آیدی محصول : 
            <span>{item.productId}</span>
             </span>
            <span className="basketUser__count ss02">
            تعداد : 
            <span>{item.cartQuantity}</span>
             </span>

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
