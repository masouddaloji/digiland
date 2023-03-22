import React, { useRef, useState } from "react";
// packages
import { Field, useField, useFormikContext } from "formik";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// components
import Validator from "../Validator/Validator";
import { persianTexts } from "../../text";
// icons
import { BiHide, BiShow } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

// styles
import "./FormControl.css";

function FormControl({ label, icon, ref, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [preview, setPreview] = useState([]);
  const [isShowCheckBox, setIsShowCheckBox] = useState(false);
  const [percentage, setPercentage] = useState(null);
  const inputRef = useRef();
  const passwordRef = useRef();
  const uploaderRef = useRef();
  const checkboxRef = useRef();

  const uploadHandler = (event) => {
    let files = event.target.files;
    let arrayFiles = Array.from(files);
    setFieldValue(field.name, arrayFiles);
  };
  const uploading = async (files) => {
    console.log("files", files);
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
    }

    case "file": {
      return (
        <>
          <div className="formControl__wrapper">
            {/* {console.log("field, meta", field, meta)} */}
            <div
              className={`uploader ${
                meta.touched && meta.error ? "formControl--invalid" : undefined
              }`}
              ref={uploaderRef}
            >
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

          <div
            className={`uploader__progress ${
              meta.value && "uploader__progress--show"
            }`}
          >
            <div className="uploader__progressbar"></div>
          </div>
          <button
            onClick={() => uploading(meta.value)}
            className={`uploader__btn ${meta.value && "uploader__btn--show"}`}
          >
            آپلود
          </button>
        </>
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
                  <option
                    disabled={option.value === "" ? true : false}
                    key={option.value}
                    value={option.value}
                    className="option"
                  >
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
    case "checkbox": {
      return (
        <div className="formControl__wrapper">
          {label && (
            <label htmlFor={field.name} className="formControl__label">
              {label}
            </label>
          )}
          <div className="formControl__box">
            <ul
              className={`checkbox__lists ${
                meta.touched && meta.error ? "formControl--invalid" : ""
              }`}
            >
              {props.options &&
                props.options.map((option) => (
                  <li className="checkbox__item" key={option.value}>
                    <Field
                      className="checkboxInput"
                      value={option.value}
                      style={{
                        backgroundColor: option.color,
                      }}
                      name={field.name}
                      type="checkbox"
                      id={option.value}
                      title={option.text}
                    />
                  </li>
                ))}
            </ul>

            {meta.touched && meta.error && (
              <span className="auth__error">{meta.error}</span>
            )}
          </div>
        </div>
      );
    }
    case "editor": {
      return (
        <div className="formControl__wrapper">
          {console.log(field, meta)}
          {label && (
            <label htmlFor={field.name} className="formControl__label">
              {label}
            </label>
          )}
          {/* <div className={`editor__box ${meta.touched && meta.error ? "formControl--invalid":""}`}> */}
            <CKEditor
              editor={ClassicEditor}
              data={field.value}
              {...props}
              {...field}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFieldValue(field.name, data);
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                meta.touched = true;
              }}
              // onFocus={ ( event, editor ) => {
              //     console.log( 'Focus.', editor );
              // } }
            />
          {/* </div> */}
            {meta.touched && meta.error && (
              <span className="auth__error">{meta.error}</span>
            )}
        </div>
      );
    }
    // case "password":
    //   break;

    default:
      return null;
  }

  // return <div className="formControl__wrapper">{element}</div>;
}

export default FormControl;
