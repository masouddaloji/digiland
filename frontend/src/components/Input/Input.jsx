import React, { useRef } from "react";
// library
import { useField } from "formik";
// components
import Validator from "../Validator/Validator";
// styles
import "./Input.css";

function Input({ label, icon, ...props }) {
  const [field, meta] = useField(props);

  const inputRef=useRef()
  // console.log(inputRef.current)
  // if(inputRef.current.type==="password"){
  //   console.log("password")
  // }
  return (
    <div className="input__wrapper">
      {label && (
        <label htmlFor={field.name} className="input__label">
          {label}
        </label>
      )}
      <div className="input__box">
        <input
        ref={inputRef}
          className={`input ${
            meta.touched && meta.error ? "input--invalid" : undefined
          }`}
          autoComplete="off"
          id={field.name}
          {...props}
          {...field}
        />
        {icon ? icon : null}
        {meta.touched && meta.error && (
          <span className="auth__error">{meta.error}</span>
        )}
      </div>
    </div>
  );
}

export default Input;
