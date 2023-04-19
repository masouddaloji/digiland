import React, { useEffect, useRef } from "react";
// packages
import { useField, useFormikContext } from "formik";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue, setFieldTouched, handleBlur } = useFormikContext();
  const containerRef = useRef();
  const editorRef = useRef();


  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label
          htmlFor={field.name}
          className={`formControl__label ${
            meta.touched && meta.error ? "label--invalid" : undefined
          }`}
        >
          {props.label}
        </label>
      )}


    <textarea className="textarea" ></textarea>
      {meta.touched && meta.error && (
        <span className="auth__error">{meta.error}</span>
      )}
    </div>
  );
};

export default TextEditor;
