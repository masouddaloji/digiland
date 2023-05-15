import { useState } from "react";
//component
import { privateAxios } from "../../api/axios";
import Spiner from "../Spiner/Spiner";
//hooks
import useAuth from "../../hooks/useAuth";
import useBasket from "../../hooks/useBasket";
//icons
import { FiPlus, FiMinus } from "react-icons/fi";
//styles
import "./ProductCount.css";

function ProductCount({ value, minValue, maxValue, productId }) {
  const { auth } = useAuth();
  const { getUserBasket } = useBasket();
  const [isLoading, setIsLoading] = useState(false);

  const increment = async () => {
    if (value < maxValue) {
      setIsLoading(true);
      await privateAxios
        .put(
          `basket/${productId}`,
          {},
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
           getUserBasket();
            setIsLoading(false);
          }
        })
        .catch((error) => console.log(error));
    } else {
      return null;
    }
  };

  const decrement = async () => {
    if (value > minValue) {
      setIsLoading(true);
      await privateAxios
        .delete(`basket/${productId}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            getUserBasket();
            setIsLoading(false);
          }
        })
        .catch((error) => console.log(error));
    } else {
      return null;
    }
  };

  return (
    <>

 
    {isLoading ? (
      <Spiner />
      ) : (
        <div className="quantity">
          <span
            onClick={() => increment()}
            className="quantity__btn quantity__btnRight"
          >
            <FiPlus className="quantity__icon" />
          </span>
          <input
            type="number"
            className="quantity__input"
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
      )}
      </>
  );
}

export default ProductCount;
