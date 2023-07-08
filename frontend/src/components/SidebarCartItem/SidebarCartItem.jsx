import {  useState } from 'react';
//packages
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//rtk query
import { useRemoveItemMutation } from '../../features/basket/basketApiSlice';
// components
import ProductCount from "../ProductCount/ProductCount";
// icons
import { CgCloseO } from "react-icons/cg";
//utils
import { addImageFallback } from '../../utils/utils';
//styles
import './SidebarCartItem.css'

const SidebarCartItem = (props) => {
  const[isLoadingUpdateCount,setIsLoadingUpdateCount]=useState(false)
  const[removeItem,{isLoading}]=useRemoveItemMutation()
  const{_id,productId,cartQuantity}=props
  const {_id:productID,title,image,price,quantity}=productId

  const removeProductFromBasketHandler =async () => {
    await removeItem(productID).unwrap()
    .then(res=>toast.success("محصول با موفقیت از سبد خرید حذف شد"))
    .catch(error=>toast.error("حذف محصول از سبد خرید با مشکل مواجه شد"))
  }
  return (
    <li className="sideBarCartItem" key={_id}>
      {(isLoading || isLoadingUpdateCount) && <div className="cartItem__loader">
        <span className="cartItem__spinner"></span>
      </div>}
      <div className="sideBarCartItem__imgBox">
        <Link to={`/product/${_id}`} className="sideBarCartItem__Link">
          <img
            src={`https://digiland-app.iran.liara.run${image}`}
            alt="mini image products"
            className="sideBarCartItem__img"
            onError={addImageFallback}
          />
        </Link>
        <CgCloseO
          className="sideBarCartItem__removeIcon"
          onClick={removeProductFromBasketHandler}
        />
      </div>
      <div className="sideBarCartItem__priceBox">
        <Link to="/" className="sideBarCartItem__LinkText">
          {title}
        </Link>
        <div className="flex">
          <bdi className="currentPrice ss02">
            {price?.toLocaleString()}
            <span className="toman">تومان</span>
          </bdi>
          <ProductCount
            value={cartQuantity ?? 1}
            minValue={1}
            maxValue={quantity}
            productId={productID}
            setIsLoadingUpdateCount={setIsLoadingUpdateCount}
          />
        </div>
      </div>
    </li>
  );
};

export default SidebarCartItem;
