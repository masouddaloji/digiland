import React, { useEffect, useReducer } from "react";
// components
import Validator from "../Validator/Validator";
// styles
import "./Input.css";

const inputReducer=(state,action)=>{
  switch (action.type) {
    case "change":{
      return{
        ...state,
        value:action.value,
        isValid:Validator(action.validation,action.value),
        error:!Validator(action.validation,action.value)
      }
    }

    default:{
      return state
    }
  }
}

function Input({ name,type, label, className, icon,validation,inputChangeHandler,placeHolder,multiple,errorText}) {
  const [input,dispatch]=useReducer(inputReducer,{
    value:"",
    isValid:false,
    error:false
  })
  const {value,isValid,error}=input
  useEffect(()=>{
    inputChangeHandler(name,value,isValid)
  },[value])
  const inputHandler=e=>{
    dispatch({
      type:"change",
      value:e.target.value,
      validation:validation,
      isValid:true,
      error:false
    })
  }

  return (
    <div className="input__wrapper">
      {label && (
<<<<<<< HEAD
        <label htmlFor={field.name} className="input__label">
=======
        <label htmlFor={name} className="input__label">
>>>>>>> parent of 62a742b (use react formik in project)
          {label}
        </label>
      )}
      <div className="input__box">
        <input
          type={type}
          name={name}
          className={`input ${className ? className : ""} ${error ? "input--invalid":undefined}`}
          value={input.value}
          onChange={inputHandler}
          validation={validation?validation:undefined}
          placeholder={placeHolder?placeHolder:undefined}
          multiple={multiple?true:false}
        />
        {icon?icon:null}
<<<<<<< HEAD
         { meta.touched && meta.error ? <span className="auth__error">{meta.error}</span>:null}
=======
         { error && <span className="auth__error">{errorText}</span>}
>>>>>>> parent of 62a742b (use react formik in project)
      </div>
    </div>
  );
}

export default Input;
