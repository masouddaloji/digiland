import { useState, useCallback, useEffect, useMemo } from "react";
//styles
import "./PriceSlider.css";

export default function PriceSlider({setSortBy, max}) {
  const gap = 100000;
  const [filterPrice, setFilterPrice] = useState([0, gap]);

  const [progressBarStyle, setProgressBarStyle] = useState({
    left: `${(filterPrice[0] / max) * 100}%`,
    right: `${100 - (filterPrice[1] / max) * 100}%`,
  });

  const changeInputMin = useCallback(
    (e) => {
      if (filterPrice[1] - e.target.value < gap) {
        setFilterPrice([filterPrice[1] - gap, filterPrice[1]]);
      } else {
        setFilterPrice([e.target.value, filterPrice[1]]);
      }
    },
    [filterPrice, gap]
  );

  const changeInputMax = useCallback(
    (e) => {
      if (e.target.value - filterPrice[0] < gap) {
        setFilterPrice([filterPrice[0], filterPrice[0] + gap]);
      } else {
        setFilterPrice([filterPrice[0], e.target.value]);
      }
    },
    [filterPrice, gap]
  );

  const filteredByPrices = () =>
    setSortBy((prev) => ({
      ...prev,
      price: `${filterPrice[0]}/${filterPrice[1]}`,
    }));

  useEffect(() => {
    setProgressBarStyle({
      left: `${(filterPrice[0] / max) * 100}%`,
      right: `${100 - (filterPrice[1] / max) * 100}%`,
    });
  }, [filterPrice, max]);

  return (
    <div className="priceSlider">
      <span className="priceSlider__title">فیلتر براساس قیمت : </span>
      <div className="progress">
        <div className="progressBar" style={progressBarStyle}></div>
        <input
          className="progress__input min__range"
          type="range"
          min={0}
          max={max}
          step={10000}
          value={filterPrice[0]}
          onInput={changeInputMin}
        />
        <input
          className="progress__input max__range"
          type="range"
          min={gap}
          max={max}
          step={10000}
          value={filterPrice[1]}
          onInput={changeInputMax}
        />
      </div>
      <div className="priceSlider__details">
        <button className="priceSlider__btn" onClick={filteredByPrices}>
          فیلتر
        </button>
        <div className="priceSlider__priceInfo ss02">
          قیمت :<span>{Number(filterPrice[0]).toLocaleString()}</span>
          تومان -<span>{Number(filterPrice[1]).toLocaleString()}</span>
          تومان
        </div>
      </div>
    </div>
  );
}
