import { useRef, useState } from "react";
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
      <div className={`inputBox`}>
        <input
          ref={inputRef}
          className={`${meta.touched && meta.error && "input--invalid"}`}
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
        <span
          className={`input__infoBox ${
            field?.value && "input__infoBox--top"
          }`}
        >
          {props?.icon ?? null}
          {props.label && <span className={`input__label`}>{props.label}</span>}
        </span>
        {props?.controler === "password" && (
          <>
            {!isShowPassword ? (
              <span className="password__statusBox">
                <BiShow
                  className="password__status"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              </span>
            ) : (
              <span className="password__statusBox">
                <BiHide
                  className="password__status"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              </span>
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
