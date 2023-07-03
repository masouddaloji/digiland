import { useCallback, useEffect, useState } from "react";
//packages
import { toast } from "react-toastify";
//rtk query
import { useDecrementItemMutation, useIncrementItemMutation } from "../../features/basket/basketApiSlice";
//icons
import { FiPlus, FiMinus } from "react-icons/fi";
//persian text
import { persianTexts } from "../../text";
//styles
import "./ProductCount.css";

function ProductCount(props) {
  const { value, minValue, maxValue, productId, setIsLoadingUpdateCount } =
    props;

  const [productCount, setProductCount] = useState(value);
  const [incrementItem, { isLoading: incrementLoading }] =
    useIncrementItemMutation();
  const [decrementItem, { isLoading: decrementLoading }] =
    useDecrementItemMutation();

  useEffect(() => {
    setIsLoadingUpdateCount(incrementLoading);
  }, [incrementLoading]);

  useEffect(() => {
    setIsLoadingUpdateCount(decrementLoading);
  }, [decrementLoading]);

  const increment = useCallback(async () => {
    if (value < maxValue) {
      await incrementItem(productId)
        .unwrap()
        .catch((error) =>
          toast.error(persianTexts.basket.incrementProductError)
        );
    }
  }, []);

  const decrement = useCallback(async () => {
    if (value > minValue) {
      await decrementItem(productId)
        .unwrap()
        .catch((error) =>
          toast.error(persianTexts.basket.decrementProductError)
        );
    }
  }, []);

  useEffect(() => {
    setProductCount(value);
  }, [value]);

  return (
    <div className="quantity">
      <span onClick={increment} className="quantity__btn quantity__btnRight">
        <FiPlus className="quantity__icon" />
      </span>
      <input
        type="number"
        className="quantity__input ss02"
        min={minValue}
        max={maxValue}
        value={productCount}
        readOnly 
      />

      <span onClick={decrement} className="quantity__btn quantity__btnLeft">
        <FiMinus className="quantity__icon" />
      </span>
    </div>
  );
}

export default ProductCount;
