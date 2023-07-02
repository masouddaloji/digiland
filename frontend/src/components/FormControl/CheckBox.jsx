import { useCallback, useState } from "react";
//packages
import { Field, useField } from "formik";
//hooks
import useOutsideClick from "../../hooks/useOutsideClick";
//icons
import { HiChevronDown } from "react-icons/hi";

const CheckBox = (props) => {
  const [field, meta, helpers] = useField(props);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const tochedHandler =useCallback( () => {
    helpers.setTouched(true)
  },[]);


  return (
    <div className="formControl__wrapper"  >
      <div className="inputBox">
        <span
          className={`input__infoBox ${field?.value && "input__infoBox--top"}`}
        >
          {props.label && <span className={`input__label`}>{props.label}</span>}
        </span>
        <div
          className={`checkbox ${
            meta.touched && meta.error && "input--invalid"
          }`}
          onClick={() => setIsShowOptions(!isShowOptions)}
        >
          <span
            className={`checkbox__header ${
              meta.touched && meta.error ? "label--invalid" : undefined
            }`}
          >
            {field?.value?.length
              ? `${field.value.length} رنگ انتخاب شد`
              : props.placeholder}
          </span>
          <HiChevronDown className="dropdownIcon" />
        </div>
        {props.options && (
          <ul
           
            className={`checkbox__lists ${
              isShowOptions
                ? "checkbox__lists checkbox__lists--show"
                : "checkbox__lists"
            }`}
          >
            {props?.options?.map((option, index) => (
              <li
                className="checkbox__item"
                key={index + 2}
                onClick={tochedHandler}
              >
                <Field
                  type="checkbox"
                  id={option.value}
                  value={option.value}
                  name={field.name}
                />
                <label htmlFor={option.value} className="checkbox__label">
                  {option.value}
                </label>
              </li>
            ))}
          </ul>
        )}
        {meta.touched && meta.error && (
          <span className="auth__error">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export default CheckBox;
