//redux
import { useDispatch } from "react-redux";
import {
  productDecrementInBasket,
  productIncrementInBasket,
  getBasket,
} from "./../../features/basketSlice";
//component
import privateAxios from "../../api/privateAxios";
//hooks
import useAuth from "../../hooks/useAuth";
import useBasket from "../../hooks/useBasket";
//icons
import { FiPlus, FiMinus } from "react-icons/fi";
//styles
import "./ProductCount.css";

function ProductCount({ value, minValue, maxValue, productId }) {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const { getUserBasket } = useBasket();

  const increment = async () => {
    if (value < maxValue) {
      dispatch(
        productIncrementInBasket({ id: productId, token: auth?.token })
      ).then(() => dispatch(getBasket(auth?.token)));
    }
  };

  const decrement = async () => {
    if (value > minValue) {
      dispatch(
        productDecrementInBasket({ id: productId, token: auth?.token })
      ).then(() => dispatch(getBasket(auth?.token)));
      //   await privateAxios
      //     .delete(`basket/${productId}`, {
      //       headers: { Authorization: `Bearer ${auth?.token}` },
      //     })
      //     .then((res) => {
      //       console.log(res);
      //       if (res.status === 200) {
      //         getUserBasket();
      //       }
      //     })
      //     .catch((error) => console.log(error));
      // } else {
      //   return null;
    }
  };

  return (
    <div className="quantity">
      <span
        onClick={() => increment()}
        className="quantity__btn quantity__btnRight"
      >
        <FiPlus className="quantity__icon" />
      </span>
      <input
        type="number"
        className="quantity__input ss02"
        min={minValue}
        max={maxValue}
        value={value}
      />

      <span
        onClick={() => decrement()}
        className="quantity__btn quantity__btnLeft"
      >
        <FiMinus className="quantity__icon" />
      </span>
    </div>
  );
}

export default ProductCount;
