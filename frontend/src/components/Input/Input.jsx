import React, { useEffect, useReducer } from "react";
import Validator from "../Validator/Validator";
import "./Input.css";

const inputReducer=(state,action)=>{
  switch (action.type) {
    case "change":{
      return{
        ...state,
        value:action.value,
        isValid:Validator(action.validation,action.value)
      }
    }

    default:{
      return state
    }
  }
}

function Input({ name,type, label, className, icon,error,validation,inputChangeHandler,placeHolder,multiple}) {
  const [input,dispatch]=useReducer(inputReducer,{
    value:"",
    isValid:false
  })
  const {value,isValid}=input
  useEffect(()=>{
    inputChangeHandler(name,value,isValid)
  },[value])
  const inputHandler=e=>{
    dispatch({
      type:"change",
      value:e.target.value,
      validation:validation,
      isValid:true
    })
  }

  return (
    <div className="input__wrapper">
      {label && (
        <label htmlFor={name} className="input__label">
          {label}
        </label>
      )}
      <div className="input__box">
        <input
          type={type}
          name={name}
          className={`input ${className ? className : ""}`}
          value={input.value}
          onChange={inputHandler}
          validation={validation?validation:undefined}
          placeholder={placeHolder?placeHolder:undefined}
          multiple={multiple?true:false}
        />
        {icon?icon:null}
         {/* { !isValid && <span className="auth__error">{error}</span>} */}
      </div>
    </div>
  );
}

export default Input;
