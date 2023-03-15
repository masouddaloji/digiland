import React, { useRef, useState } from "react";
// library
import { Field, useField, useFormikContext } from "formik";
// components
import Validator from "../Validator/Validator";
// icons
import { BiHide, BiShow } from "react-icons/bi";

// styles
import "./FormControl.css";
import { persianTexts } from "../../text";

function FormControl({ label, icon, ref, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const inputRef = useRef();
  const passwordRef = useRef();
  const uploaderRef = useRef();

  const uploadHandler = (event) => {
    let files = event.target.files;
    let arrayFiles = Array.from(files);
    setFieldValue(field.name, arrayFiles);
  };
  let element = null;
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
              type={!isShowPassword ? "password" : "text"}
              ref={passwordRef}
              className={`input ${
                meta.touched && meta.error ? "formControl--invalid" : undefined
              }`}
              autoComplete="off"
              id={field.name}
              {...props}
              {...field}
            />
            {!isShowPassword ? (
              <BiShow
                className="formControl__icon"
                onClick={() => setIsShowPassword(true)}
              />
            ) : (
              <BiHide
                className="formControl__icon"
                onClick={() => setIsShowPassword(false)}
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
          <div className="uploader" ref={uploaderRef}>
            <label htmlFor={field.name} className="uploader__label">
              {icon ? icon : null}
              {props.placeHolder}
            </label>

            <input
              type="file"
              id={field.name}
              className={`uploader__input ${
                meta.touched && meta.error ? "formControl--invalid" : undefined
              }`}
              {...props}
              {...field}
              onChange={uploadHandler}
              value=""
            />
            {meta.touched && meta.error && (
              <span className="auth__error">{meta.error}</span>
            )}
          </div>
        </div>
      );
    }

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
    // case "password":
    //   break;

    default:
      break;
  }

  // return <div className="formControl__wrapper">{element}</div>;
}

export default FormControl;
