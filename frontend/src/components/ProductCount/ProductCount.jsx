import React from "react";
import {FiPlus,FiMinus} from 'react-icons/fi'
import "./ProductCount.css";

function ProductCount({ value, minValue, maxValue, newValue }) {
  const increment = () => {
    value >= maxValue? newValue(maxValue) :  newValue(value + 1);
  };
  const decrement = () => {
    value <= minValue ? newValue(minValue) : newValue(value - 1);
  };

  return (
    <div className="quantity">
    <span onClick={() => increment()} className="quantity__btn quantity__btnRight">
        <FiPlus className="quantity__icon"/>
        </span>
      <input
        type="number"
        className="quantity__input"
        min={minValue}
        max={maxValue}
        value={value}
        onInput={(e) => (e.target.value = value)}
      />
        
        <span onClick={() => decrement()} className="quantity__btn quantity__btnLeft">
            <FiMinus className="quantity__icon"/>
        </span>

    </div>
  );
}

export default ProductCount;
