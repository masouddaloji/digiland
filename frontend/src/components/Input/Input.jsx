import React, { useEffect, useReducer } from "react";
// library
import { useField } from "formik";
// components
import Validator from "../Validator/Validator";
// styles
import "./Input.css";

function Input({ label, icon, ...props }) {
  const [field, meta] = useField(props);
  console.log("field", field);
  console.log("meta", meta);
  return (
    <div className="input__wrapper">
      {label && (
        <label htmlFor={field.name} className="input__label">
          {label}
        </label>
      )}
      <div className="input__box">
        <input
          className={`input ${meta.touched && meta.error  ? "input--invalid":undefined}`}
          autoComplete="off"
          {...field} {...props}
        />
        {icon?icon:null}
         { meta.touched && meta.error ? <span className="auth__error">{meta.error}</span>:null}
      </div>
    </div>
  );
}

export default Input;
