// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
// import { maxWidth } from '@mui/system';

// function valuetext(value) {
//   return `${value}°C`;
// }

// const minDistance = 100;

// export default function MinimumDistanceSlider() {
//   const [value, setValue] = React.useState([1000, 10000]);

//   const handleChange = (event, newValue, activeThumb) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (activeThumb === 0) {
//       setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
//     } else {
//       setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
//     }
//   };

//   return (
//     .
//     <Box sx={{ color: '#0183ff', width:'100%',maxWidth:'300px','& .MuiSlider-thumb': {
//           background:'#0183ff',
//           width:'15px',
//           height:'15px'
//     }, }}>
//       <Slider
//         getAriaLabel={() => 'Minimum distance'}
//         value={value}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//         disableSwap
//       />

//     </Box>
//   );
// }

import { useState } from "react";
//styles
import "./PriceSlider.css";

export default function PriceSlider({minPrice,setMinPrice,maxPrice,setMaxPrice,lowestPrice,highestPrice}) {
  const[minPriceWithoutFiltered,setMinPriceWithoutFiltered]=useState(parseInt(minPrice))
  const[maxPriceWithoutFiltered,setMaxPriceWithoutFiltered]=useState(parseInt(maxPrice))
  const[progressBarStyle,setProgressBarStyle]=useState({
    left:`${(minPriceWithoutFiltered / highestPrice) * 100}%`,
    right:`${100 - (maxPriceWithoutFiltered / highestPrice)* 100 }%`
  })
 
  const gap=parseInt(10000)
  const changeInputMin=(e)=>{
            
    if(maxPriceWithoutFiltered - e.target.value < gap){
      setMinPriceWithoutFiltered(maxPriceWithoutFiltered - gap)
      setProgressBarStyle(prev=>({...prev,left:`${(minPriceWithoutFiltered / highestPrice) * 100}%`}))
    }else{
      setMinPriceWithoutFiltered(parseInt(e.target.value))
       setProgressBarStyle(prev=>({...prev,left:`${(minPriceWithoutFiltered / highestPrice) * 100}%`}))
    }

    }
  const changeInputMax=(e)=>{
            
    if(e.target.value - minPriceWithoutFiltered < gap){
      setMaxPriceWithoutFiltered(minPriceWithoutFiltered + gap)
      setProgressBarStyle(prev=>({...prev,right:`${100 -(maxPriceWithoutFiltered / highestPrice)* 100 }%`}))
    }else{
      setMaxPriceWithoutFiltered(parseInt(e.target.value))
      setProgressBarStyle(prev=>({...prev,right:`${100 -(maxPriceWithoutFiltered / highestPrice)* 100 }%`}))
    }
    }
    const filteredByPrices=()=>{
      setMaxPrice(maxPriceWithoutFiltered)
      setMinPrice(minPriceWithoutFiltered)
    }

  return (
    <div className="priceSlider">
    <span className="priceSlider__title">فیلتر براساس قیمت : </span>
      <div className="progress">
        <div className="progressBar" style={progressBarStyle}></div>
        <input
          className="progress__input min__range"
          type="range"
          min={lowestPrice}
          max={highestPrice}
          step={1000}
          value={minPriceWithoutFiltered}
          onInput={changeInputMin}
        />
        <input
          className="progress__input max__range"
          type="range"
          min={lowestPrice}
          max={highestPrice}
          step={1000}
          value={maxPriceWithoutFiltered}
          onInput={changeInputMax}
        />
      </div>
      <div className="priceSlider__details">
        <button className="priceSlider__btn" onClick={filteredByPrices}>فیلتر</button>
        <div className="priceSlider__priceInfo">
          قیمت : 
          <span>{Number(minPriceWithoutFiltered).toLocaleString()}</span>
          تومان
          -
          <span>{Number(maxPriceWithoutFiltered).toLocaleString()}</span>
          تومان
        </div>
      </div>
    </div>
  );
}
