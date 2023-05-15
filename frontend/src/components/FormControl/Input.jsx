import  { useRef, useState } from "react";
// packages
import { useField } from "formik";
// icons
import { BiHide, BiShow } from "react-icons/bi";

const Input = (props) => {
  const [field, meta, helpers] = useField(props);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const inputRef = useRef();
  return (
    <div className="formControl__wrapper">
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
      <div className={`formControl__box`}>
        <input
          ref={inputRef}
          className={`input  ${
            meta.touched && meta.error ? "formControl--invalid" : undefined
          }`}
          autoComplete="off"
          id={field.name}
          {...props}
          {...field}
          type={
            props?.controler !== "password"
              ? props.controler
              : !isShowPassword
              ? "password"
              : "text"
          }
        />
        {props?.controler === "password" && (
          <>
            {!isShowPassword ? (
              <BiShow
                className="password__status"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            ) : (
              <BiHide
                className="password__status"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            )}
          </>
        )}
      </div>
      {meta.touched && meta.error && (
        <span className="auth__error">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
