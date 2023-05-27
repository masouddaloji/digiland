//redux
import { useDispatch, useSelector } from "react-redux";
import {
  productDecrementInBasket,
  productIncrementInBasket,
  getBasket,
} from "./../../features/basketSlice";
import { selectToken } from "../../features/auth/authSlice";

//component
import privateAxios from "../../api/privateAxios";

import useBasket from "../../hooks/useBasket";
//icons
import { FiPlus, FiMinus } from "react-icons/fi";
//styles
import "./ProductCount.css";

function ProductCount({ value, minValue, maxValue, productId }) {
  const token=useSelector(selectToken)
  const dispatch = useDispatch();
  const { getUserBasket } = useBasket();

  const increment = async () => {
    if (value < maxValue) {
      dispatch(
        productIncrementInBasket({ id: productId, token: token })
      ).then(() => dispatch(getBasket(token)));
    }
  };

  const decrement = async () => {
    if (value > minValue) {
      dispatch(
        productDecrementInBasket({ id: productId, token: token })
      ).then(() => dispatch(getBasket(token)));

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
