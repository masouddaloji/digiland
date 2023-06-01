import { useState } from "react";
//packages
import { Link } from "react-router-dom";
//rtk query
import { useRemoveItemMutation } from "../../../features/basket/basketApiSlice";
//compomemts
import ProductCount from "../../ProductCount/ProductCount";
//icons
import { IoMdClose } from "react-icons/io";
//styles
import "./CartItem.css";

const CartItem = (props) => {
  const {
    cartQuantity,
    productId: { _id, image, title, price, quantity },
  } = props;
  const [removeItem, { isLoading: isLoadingRemove }] = useRemoveItemMutation();
  const [isLoadingUpdateCount, setIsLoadingUpdateCount] = useState(false);

  const removeProductFromBasketHandler = async (id) => {
    await removeItem(id)
      .unwrap()
      .catch((error) => toast.error("حذف محصول از سبد خرید با مشکل مواجه شد"));
  };
  return (
    <tr
      className={`${
        isLoadingRemove || isLoadingUpdateCount
          ? "cartItem__wrapper--loading"
          : null
      }`}
    >
      <td>
        <IoMdClose
          className="cart__removeIcon"
          onClick={() => removeProductFromBasketHandler(_id)}
        />
      </td>
      <td>
        <Link to={`/product/${_id}`} className="cart__productImglink">
          <img
            src={`http://localhost:8000${image}`}
            alt="image products"
            className="cart__productImg"
          />
        </Link>
      </td>
      <td data-title="محصول">
        <Link
          title={title}
          className="cart__productName"
          to={`/product/${_id}`}
        >
          {title}
        </Link>
      </td>
      <td data-title="قیمت">
        <bdi className="currentPrice ss02">
          {price.toLocaleString()}
          <span className="toman">تومان</span>
        </bdi>
      </td>
      <td data-title="تعداد">
        <ProductCount
          value={cartQuantity ?? 1}
          minValue={1}
          maxValue={quantity}
          productId={_id}
          setIsLoadingUpdateCount={setIsLoadingUpdateCount}
        />
      </td>
      <td data-title="جمع جزء">
        <bdi className="currentPrice ss02 changeable">
          {(cartQuantity * price).toLocaleString()}
          <span className="toman">تومان</span>
        </bdi>
      </td>
    </tr>
  );
};

export default CartItem;
