import React, { useEffect, useRef, useState } from "react";
import "./InputRating.css";

function InputRating({title}) {
  const[inputValue,setInputValue]=useState(null)
  const[circlePosition,setCirclePosition]=useState({right:0})
  const[tooltipStyles,setTooltipStyles]=useState({right:0,display:"none"})
  const[sliderWidth,setSliderWidth]=useState({width:0})
  const[titleRating,setTitleRating]=useState(null)
   const changeInput=e=>{
     setInputValue(Number(e.target.value))
    setCirclePosition({right:`calc(${(e.target.value - 1 ) * 25}% - ${6}px)`})
    setTooltipStyles({right:`calc(${(e.target.value - 1 ) * 25}%)`,opacity:"1",visibility: "visible"})
    setSliderWidth({width:`${(e.target.value -1 ) * 25}%`})
    switch(Number(e.target.value)){
      case 1:
        setTitleRating("خیلی بد")
        break
      case 2:
        setTitleRating("بد")
        break
      case 3:
        setTitleRating("معمولی")
        break
      case 4:
        setTitleRating("خوب")
        break
      case 5:
        setTitleRating("عالی")
        break
      default:
        setTitleRating(null)
    }
    setTimeout(()=>setTooltipStyles({opacity:"0",visibility: "hidden"}),1500)
     
  
   }
   

  return (
    <div className="reviewForm__ratingWrapper">
      <label htmlFor="buildQuality" className="reviewForm__ratingLabel">
       {title} :
      </label>
     <div className="range">

     {/* <span className="step step0"></span> */}
      <span className="step step1"></span>
      <span className="step step2"></span>
      <span className="step step3"></span>
      <span className="step step4"></span>     
      <span className="range__value" style={sliderWidth}></span>
      <span className="range__circle" style={circlePosition}></span>
      <input type="range" value={inputValue} onInput={changeInput} min={1} max={5} step={1} name="" id="" className="range__input" />
     </div>
     
      <span className="range__output" style={tooltipStyles}>{titleRating}</span>
    </div>
  );
}

export default InputRating;
