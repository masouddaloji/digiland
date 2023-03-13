import React, { useRef, useState } from "react";
// library
import { Field, useField, useFormikContext } from "formik";
// components
import Validator from "../Validator/Validator";
// icons
import { BiHide, BiShow } from "react-icons/bi";

// styles
import "./Input.css";
import { persianTexts } from "../../text";

function Input({ label, icon, type, ...props }) {
  const [field, meta,helpers] = useField(props);
  const { setFieldValue } = useFormikContext()
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef();
  const passwordRef = useRef();
  const uploaderRef = useRef();


  const element =
    type === "password" ? (
      <>
        {label && (
          <label htmlFor={field.name} className="input__label">
            {label}
          </label>
        )}
        <div className="input__box">
          <input
            type={!isShowPassword ? "password" : "text"}
            ref={passwordRef}
            className={`input ${
              meta.touched && meta.error ? "input--invalid" : undefined
            }`}
            autoComplete="off"
            id={field.name}
            {...props}
            {...field}
          />
          {!isShowPassword ? (
            <BiShow
              className="input__icon"
              onClick={() => setIsShowPassword(true)}
            />
          ) : (
            <BiHide
              className="input__icon"
              onClick={() => setIsShowPassword(false)}
            />
          )}
          {meta.touched && meta.error && (
            <span className="auth__error">{meta.error}</span>
          )}
        </div>
      </>
    ) : type === "file" ? (
      <>
        <div
          className="uploader"
          ref={uploaderRef}
        >
          <label htmlFor={field.name} className="uploader__label">
            {icon ? icon : null}
            {props.placeHolder}
          </label>
          {/* <input
            type="file"
            id={field.name}
            accept="image/*"
            multiple={props.multiple?true:false}
            className={`uploader__input ${
              meta.touched && meta.error ? "input--invalid" : undefined
            }`}
            {...props}
            {...field}
            onBlur={()=>setFieldValue(field.name)}
            onChange={e=>{
                setFieldValue(field.name,e.currentTarget.files)
                console.log("e.currentTarget.files",e.currentTarget.files)
            }} */}
          {/* /> */}
            <Field type="file"
            id={field.name}
            className={`uploader__input ${
              meta.touched && meta.error ? "input--invalid" : undefined
            }`}
            value={undefined}
            {...props}
            {...field}
            onChange={e=>setFieldValue(field.name,e.currentTarget.files)}
            />
           {meta.touched && meta.error && (
            <span className="auth__error">{meta.error}</span>
          )}
        </div>
      </>
    ) : (
      <>
        {label && (
          <label htmlFor={field.name} className="input__label">
            {label}
          </label>
        )}
        <div className="input__box">
          <input
            ref={inputRef}
            className={`input ${
              meta.touched && meta.error ? "input--invalid" : undefined
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
      </>
    );
  return <div className="input__wrapper">{element}</div>;
}

export default Input;
