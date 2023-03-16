import React, { useRef, useState } from "react";
// library
import { Field, useField, useFormikContext } from "formik";
// components
import Validator from "../Validator/Validator";
// icons
import { BiHide, BiShow } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

// styles
import "./FormControl.css";
import { persianTexts } from "../../text";
import { Link } from "react-router-dom";

function FormControl({ label, icon, ref, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue,errors,setFieldTouched,touched } = useFormikContext();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [preview, setPreview] = useState([]);
  const [isShowCheckBox,setIsShowCheckBox]=useState(false)
  const inputRef = useRef();
  const passwordRef = useRef();
  const uploaderRef = useRef();
  const checkboxRef = useRef();

  const uploadHandler = (event) => {
    let files = event.target.files;
    let arrayFiles = Array.from(files);
    setFieldValue(field.name, arrayFiles);
  };
  switch (props.type) {
    case "password": {
      return (
        <div className="formControl__wrapper">
          {label && (
            <label htmlFor={field.name} className="formControl__label">
              {label}
            </label>
          )}
          <div className="formControl__box">
            <input
              ref={passwordRef}
              className={`input ${
                meta.touched && meta.error ? "formControl--invalid" : undefined
              }`}
              autoComplete="off"
              id={field.name}
              {...props}
              {...field}
              type={isShowPassword ?"text": "password" }
            />
            {!isShowPassword ? (
              <BiShow
                className="formControl__icon"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            ) : (
              <BiHide
                className="formControl__icon"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            )}
            {meta.touched && meta.error && (
              <span className="auth__error">{meta.error}</span>
            )}
          </div>
        </div>
      );
    }

    case "file": {
      return (
        <div className="formControl__wrapper">
          <div className={`uploader ${
                meta.touched && meta.error ? "formControl--invalid" : undefined
              }`} ref={uploaderRef}>
            <label htmlFor={field.name} className="uploader__label">
              {icon ? icon : null}
              {props.placeHolder}
            </label>

            <input
              type="file"
              id={field.name}
              className={`uploader__input `}
              {...props}
              {...field}
              onChange={uploadHandler}
              value=""
            />
          </div>
            {meta.touched && meta.error && (
              <span className="auth__error">{meta.error}</span>
            )}
        </div>
      );
    }

    case "email":
    case "text": {
      return (
        <div className="formControl__wrapper">
          {label && (
            <label htmlFor={field.name} className="formControl__label">
              {label}
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
            {icon ? icon : null}
            {meta.touched && meta.error && (
              <span className="auth__error">{meta.error}</span>
            )}
          </div>
        </div>
      );
    }
    case "select": {
      return (
        <div className="formControl__wrapper">
          {label && (
            <label htmlFor={field.name} className="formControl__label">
              {label}
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
                  <option disabled={option.value===""?true:false} key={option.value} value={option.value} className="option">
                    {option.text}
                  </option>
                ))}
            </Field>
            {icon ? icon : null}
            {meta.touched && meta.error && (
              <span className="auth__error">{meta.error}</span>
            )}
          </div>
        </div>
      );
    }
    case "textarea": {
      return (
        <div className="formControl__wrapper">
          {label && (
            <label htmlFor={field.name} className="formControl__label">
              {label}
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
            {icon ? icon : null}
            {meta.touched && meta.error && (
              <span className="auth__error">{meta.error}</span>
            )}
          </div>
        </div>
      );
    }
    case "checkbox":{
      return (
      //   <div className="formControl__wrapper">
      //   {label && (
      //     <label htmlFor={field.name} className="formControl__label">
      //       {label}
      //     </label>
      //   )}
      //   <div className="formControl__box">
      //     <Field
      //       as="select"
      //       className={`select ${
      //         meta.touched && meta.error ? "formControl--invalid" : undefined
      //       }`}
      //       id={field.name}
      //       {...props}
      //       {...field}
      //     >
      //       {props.options &&
      //         props.options.map((option) => (
      //           <option disabled={option.value===""?true:false} key={option.value} value={option.value} className="option">
      //             {option.text}
      //           </option>
      //         ))}
      //     </Field>
      //     {icon ? icon : null}
      //     {meta.touched && meta.error && (
      //       <span className="auth__error">{meta.error}</span>
      //     )}
      //   </div>
      // </div>
        <div to="#" className="formControl__wrapper" >
        {console.log("field, meta",field, meta)}
          {label && (
            <label htmlFor={field.name} className="formControl__label">
              {label}
            </label>
          )}
          <div className="formControl__box">
            <div  className={`checkbox ${touched["productColor"] && errors["productColors"] ? "formControl--invalid" : ""}`} {...field} ref={checkboxRef} >  
            <FiChevronDown className={`checkbox__icon ${isShowCheckBox?"rotate":""}`} onClick={()=> setIsShowCheckBox(!isShowCheckBox)}/>
            <ul className={`checkbox__lists ${isShowCheckBox?"checkbox__lists--show":""}`}>
              {props.options &&
                props.options.map((option) => (
                  <li className="checkbox__item"  key={option.value}>
                  <Field name={field.name} type="checkbox" id={option.value} checked={field.value.includes(option.value)}   value={option.value}  />
                    <label htmlFor={option.value} className="checkbox__label">{option.text}</label>
                  </li>
                ))}
                </ul>
            </div>
            {icon ? icon : null}
            {touched["productColors"] && errors["productColors"] && (
              <span className="auth__error">{errors["productColors"]}</span>
            )}
          </div>
        </div>
      )
    }
    // case "password":
    //   break;

    default:
      return null;
  }

  // return <div className="formControl__wrapper">{element}</div>;
}

export default FormControl;
