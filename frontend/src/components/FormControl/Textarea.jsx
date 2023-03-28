import React from "react";
// packages
import { Field, useField, useFormikContext } from "formik";

const Textarea = (props) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label htmlFor={field.name} className={`formControl__label ${meta.touched && meta.error?"label--invalid":undefined}`}>
          {props.label}
        </label>
      )}
      <div className="formControl__box">
        <textarea
          className={`textarea ${
            meta.touched && meta.error ? "formControl--invalid" : undefined
          }`}
          autoComplete="off"
          id={field.name}
          {...props}
          {...field}
        />
        {props.icon ? props.icon : null}
        {meta.touched && meta.error && (
          <span className="auth__error">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
