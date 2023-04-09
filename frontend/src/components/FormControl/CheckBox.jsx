import React, {  useEffect, useRef, useState } from "react";
//packages
import { Field, useField, useFormikContext } from "formik";
//icons
import { HiChevronDown } from "react-icons/hi";


const CheckBoxTest = (props) => {
  const [field, meta, helpers] = useField(props);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const { setFieldTouched,handleBlur} = useFormikContext();
  const containerRef=useRef()
  const tochedHandler=()=>{
    setFieldTouched(field.name,true)
  }

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (!containerRef?.current.contains(e.target)) {
        setIsShowOptions(false);
        handleBlur(e)
      }
    };
    document.body.addEventListener("click", outsideClickHandler);
    return () => {
      document.body.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  return (
    <div className="formControl__wrapper" ref={containerRef}>
    {props.label && (
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
    <div className="checkbox__wrapper" >
      <div
        className={`checkbox ${
          meta.touched && meta.error && "formControl--invalid"
        }`}
        onClick={() =>setIsShowOptions(!isShowOptions)}
      >
        <span
          className={`checkbox__header ${
            meta.touched && meta.error ? "label--invalid" : undefined
          }`}
        >
          {field?.value?.length?`${field.value.length} رنگ انتخاب شد`:props.placeholder}
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
            <li className="checkbox__item" key={index + 2} onClick={tochedHandler}>
              <Field
                type="checkbox"
                id={option.value}
                value={option.value}
                name={field.name}
              />
              <label htmlFor={option.value} className="checkbox__label">
                {option.text}
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

export default CheckBoxTest;
{
  /* <input type="checkbox" name="colors" id={item.value} value={item.value} onChange={changeHandler}/>
<label htmlFor={item.value} className="checkbox__label">
{item.text}
</label> */
}
