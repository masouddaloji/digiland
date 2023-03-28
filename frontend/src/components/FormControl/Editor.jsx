import React from "react";
// packages
import { Field, useField, useFormikContext } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label htmlFor={field.name} className={`formControl__label ${meta.touched && meta.error?"label--invalid":undefined}`}>
          {props.label}
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
};

export default Editor;
