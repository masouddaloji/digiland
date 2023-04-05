import React, { useState } from "react";
//packages
import { Field, useField,useFormikContext } from "formik";
//icons
import { HiChevronDown } from "react-icons/hi";
import { GiCheckMark } from "react-icons/gi";
//styles
import "./CheckBoxTest.css";

const CheckBoxTest = (props) => {
  const [field, meta, helpers] = useField(props);
  const [allSelected, setAllSelected] = useState([]);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const {setFieldTouched,setFieldValue}=useFormikContext()


  return (
    <div className="checkbox__wrapper">
      <div
        className={`checkbox ${meta.touched && meta.error && "formControl--invalid"}`}
        onClick={() => {
          setIsShowOptions(!isShowOptions)
          // setFieldTouched(field.name,true)
        }}
      >
        <span className={`checkbox__header ${meta.touched && meta.error?"label--invalid":undefined}`}>لطفا رنگ محصول را انتخاب کنید </span>
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
          {props?.options?.map((option,index) => (
            <li className="checkbox__item" key={index+2}>
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
  );
};

export default CheckBoxTest;
{
  /* <input type="checkbox" name="colors" id={item.value} value={item.value} onChange={changeHandler}/>
<label htmlFor={item.value} className="checkbox__label">
{item.text}
</label> */
}
