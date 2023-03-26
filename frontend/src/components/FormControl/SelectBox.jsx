import React from "react";
// packages
import { Field, useField, useFormikContext } from "formik";

const SelectBox = (props) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label htmlFor={field.name} className="formControl__label">
          {props.label}
        </label>
      )}
      <div className="formControl__box">
        <Field
          as="select"
          className={`select ${
            meta.touched && meta.error ? "formControl--invalid" : undefined
          }`}
          id={field.name}
          {...props}
          {...field}
        >
          {props.options &&
            props.options.map((option) => (
              <option
                disabled={option.value === "" ? true : false}
                key={option.value}
                value={option.value}
                className="option"
              >
                {option.text}
              </option>
            ))}
        </Field>
        {props.icon ? props.icon : null}
        {meta.touched && meta.error && (
          <span className="auth__error">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export default SelectBox;
