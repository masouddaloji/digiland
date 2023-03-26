import React, { useRef, useState } from "react";
// packages
import { Field, useField, useFormikContext } from "formik";
// persian text
import { persianTexts } from "../../text";
// icons
import { BiHide, BiShow } from "react-icons/bi";

const PasswordInput = (props) => {
  const [field, meta, helpers] = useField(props);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const passwordRef = useRef();
  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label htmlFor={field.name} className="formControl__label">
          {props.label}
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
          type={isShowPassword ? "text" : "password"}
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
};

export default PasswordInput;
