import React, { useEffect, useState } from "react";
//icons
import {FiPlus,FiMinus} from 'react-icons/fi'
//styles
import "./ProductCount.css";

function ProductCount({ value, minValue, maxValue, newValue }) {

  const [count,setCount]=useState(value)

  const increment = () => {
    count >= maxValue? setCount(maxValue) :  setCount(count + 1);
  };

  const decrement = () => {
    count <= minValue ? setCount(minValue) : setCount(count - 1);
  };
useEffect(()=>{
  newValue(count)
},[count])
  return (
    <div className="quantity">
    <span onClick={increment} className="quantity__btn quantity__btnRight">
        <FiPlus className="quantity__icon"/>
        </span>
      <input
        type="number"
        className="quantity__input"
        min={minValue}
        max={maxValue}
        value={count}
      />
        
        <span onClick={ decrement} className="quantity__btn quantity__btnLeft">
            <FiMinus className="quantity__icon"/>
        </span>

    </div>
  );
}

export default ProductCount;
