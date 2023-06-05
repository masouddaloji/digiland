import { useState, useCallback, useEffect, useMemo } from "react";
//styles
import "./PriceSlider.css";

export default function PriceSlider({ pageInfo,setPageInfo }) {
  const gap = 100000;
  const maxPrice = 300000000;
  const [filterPrice, setFilterPrice] = useState([0, maxPrice]);

  const [progressBarStyle, setProgressBarStyle] = useState({
    left: `${(filterPrice[0] / maxPrice) * 100}%`,
    right: `${100 - (filterPrice[1] / maxPrice) * 100}%`,
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
    setPageInfo((prev) => ({
      ...prev,
      price: `${filterPrice[0]}/${filterPrice[1]}`,
    }));

  useEffect(() => {
    setProgressBarStyle({
      left: `${(filterPrice[0] / maxPrice) * 100}%`,
      right: `${100 - (filterPrice[1] / maxPrice) * 100}%`,
    });
  }, [filterPrice, maxPrice]);
  useEffect(()=>{
    if(!pageInfo.price) setFilterPrice([0,maxPrice])
  },[pageInfo])

  return (
    <div className="priceSlider">
      <div className="progress">
        <div className="progressBar" style={progressBarStyle}></div>
        <input
          className="progress__input min__range"
          type="range"
          min={0}
          max={maxPrice}
          step={10000}
          value={filterPrice[0]}
          onInput={changeInputMin}
        />
        <input
          className="progress__input max__range"
          type="range"
          min={gap}
          max={maxPrice}
          step={10000}
          value={filterPrice[1]}
          onInput={changeInputMax}
        />
      </div>
      <div className="priceSlider__details">
        
        <div className="priceSlider__priceInfo ss02">
        <div className="priceSlider__pricess"> 
        <p> از : <span>{Number(filterPrice[0]).toLocaleString()}</span> تومان </p>   
           <p> تا : <span>{Number(filterPrice[1]).toLocaleString()}</span> تومان </p>
        </div>
        </div>
        <button className="priceSlider__btn" onClick={filteredByPrices}>
          فیلتر
        </button>
      </div>
    </div>
  );
}
