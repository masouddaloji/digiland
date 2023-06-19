import { useRef } from "react";
// packages
import { useField } from "formik";
import {Editor} from "@tinymce/tinymce-react"
//redux
import { useSelector } from "react-redux";

const TextEditor = (props) => {
  const editorRef = useRef();
  const { token } = useSelector((state) => state?.auth);
  const [field, meta, helpers] = useField(props);

  const handleImageUpload = async (blobInfo, progress) => {
    try {
      const formData = new FormData();
      formData.append('image', blobInfo.blob());  
      const response = await fetch('http://localhost:8000/upload/articleimg', {
        method: 'POST',
        body: formData,
        headers: {
                Authorization: `Bearer ${token}`,
              },
      });
  
      if (!response.ok) {
        throw new Error('HTTP Error: ' + response.status);
      }
  
      const {path} = await response.json();
      return `http://localhost:8000${path}`;
    } catch (error) {
      throw new Error('Image upload failed due to a XHR Transport error. Code: ' + error.message);
    }
  };

  return (
    <div className="editor__wrapper">
      <div
        className={`editor__box ${
          meta.touched && meta.error ? "input--invalid" : ""
        }`}
      >
        <Editor
          apiKey="l07sae2bmifyodxlctqvr4dlmlcxr61yrgx3rnm6enziwcgo"
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={field?.value}
          onEditorChange={(content) => {
            helpers.setTouched(true);
            helpers.setValue(content);
          }}
          {...props}
          {...field}
          ref={editorRef}
          init={{
            images_upload_handler: handleImageUpload,
            content_css: "false",
            directionality: "rtl",
            height: props.height,
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
              "alignright alignjustify | outdent indent | " +
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
