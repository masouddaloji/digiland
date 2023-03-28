import React from "react";
// packages
import { Field, useField, useFormikContext } from "formik";
// icons
import {HiChevronDown} from 'react-icons/hi'

const SelectBox = (props) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label
          htmlFor={field.name}
          className={`formControl__label ${
            meta.touched && meta.error ? "label--invalid" : undefined
          }`}
        >
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
        <HiChevronDown className="select__icon"/>
      </div>
      {meta.touched && meta.error && (
        <span className="auth__error">{meta.error}</span>
      )}
    </div>
  );
};

export default SelectBox;
