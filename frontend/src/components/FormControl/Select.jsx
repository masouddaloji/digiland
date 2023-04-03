import React, { useEffect, useRef, useState } from "react";
//packages
import { useField, useFormikContext } from "formik";
//icons
import { HiChevronDown } from "react-icons/hi";

const Select = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [isShowOPtions, setIsShowOPtions] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const inputRef = useRef();

  const dropdownIconHandler = async() => {
      await setIsShowOPtions(!isShowOPtions)
    inputRef?.current.focus();
  };


  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (!inputRef?.current.contains(e.target)) {
        setIsShowOPtions(false);
      }
    };
    document.body.addEventListener("click", outsideClickHandler);
    return () => {
      document.body.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  return (
    <div className="formControl__wrapper">
      {props?.label && (
        <label
          htmlFor={field.name}
          className={`formControl__label ${
            meta.touched && meta.error ? "label--invalid" : undefined
          }`}
        >
          {props?.icon ? props.icon : null}
          {props.label}
        </label>
      )}
      <div className="formControl__box">
        <input
          ref={inputRef}
          className={`input  ${
            meta.touched && meta.error ? "formControl--invalid" : undefined
          }`}
          id={field.name}
          readOnly
          {...props}
          {...field}
          type="text"
          
        />
        <HiChevronDown
          className={`dropdown__icon ${
            isShowOPtions ? "dropdown__icon--rotate" : undefined
          }`}
          onClick={dropdownIconHandler}
        />
      </div>
      {props.options && (
        <ul
          className={`select__options ${
            isShowOPtions ? "select__options--show" : undefined
          }`}
        >
          {props.options.map((option) => (
            <li
              key={option.value}
              value={option.value}
              className="select__option"
              onClick={() =>{
                setFieldValue(field.name, option.value)
                setIsShowOPtions(false)
                }}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}

      {meta.touched && meta.error && (
        <span className="auth__error">{meta.error}</span>
      )}
    </div>
  );
};

export default Select;
