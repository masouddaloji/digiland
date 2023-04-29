import React, { useEffect, useRef } from "react";
// packages
import { useField, useFormikContext } from "formik";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue, setFieldTouched, handleBlur } = useFormikContext();
  const containerRef = useRef();
  const editorRef = useRef();

  const change = () => {
    if (editorRef?.current) {
      console.log(editorRef.current.getContent());
    }
  };
  useEffect(() => {
    const outSideClickHandler = (e) => {
      const isIn = !containerRef?.current?.contains(e.target);
      if (isIn) {
        handleBlur(e);
      }
    };
    document.body.addEventListener("click", outSideClickHandler);
    return () => {
      document.body.removeEventListener("click", outSideClickHandler);
    };
  }, []);
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

      <div
        className={`editor__box ${
          meta.touched && meta.error ? "formControl--invalid" : ""
        }`}
      >
        <Editor
          apiKey="l07sae2bmifyodxlctqvr4dlmlcxr61yrgx3rnm6enziwcgo"
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={field?.value}
          onEditorChange={(content) => {
            setFieldTouched(field?.name, true);
            setFieldValue(field?.name, content);
          }}
          {...props}
          {...field}
          ref={editorRef}
          init={{
            content_css:"false",
            directionality:"rtl",
            height: 300,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat| table | help",
          }}
        />
      </div>
      {meta.touched && meta.error && (
        <span className="auth__error">{meta.error}</span>
      )}
    </div>
  );
};

export default TextEditor;