import React, { useRef } from "react";
// packages
import { Field, useField, useFormikContext } from "formik";

const Input = (props) => {
  const [field, meta, helpers] = useField(props);
  const inputRef = useRef();
  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label htmlFor={field.name} className={`formControl__label ${meta.touched && meta.error?"label--invalid":undefined}`}>
          {props.label}
        </label>
      )}
      <div className="formControl__box">
        <input
          ref={inputRef}
          className={`input ${
            meta.touched && meta.error ? "formControl--invalid" : undefined
          }`}
          autoComplete="off"
          id={field.name}
          {...props}
          {...field}
        />
        {props.icon ? props.icon : null}
        
      </div>
      {meta.touched && meta.error && (
          <span className="auth__error">{meta.error}</span>
        )}
    </div>
  );
};

export default Input;
