import { useCallback, useRef } from "react";
// packages
import { useField } from "formik";
import { Editor } from "@tinymce/tinymce-react";
//redux
import { useSelector } from "react-redux";
import { useUploadCoverArticleMutation } from "../../features/article/articleApiSlice";

const TextEditor = (props) => {
  const editorRef = useRef();
  const { token } = useSelector((state) => state?.auth);
  const [field, meta, helpers] = useField(props);
  const [uploadCoverArticle] = useUploadCoverArticleMutation();

  const handleImageUpload =useCallback( async (blobInfo, progress) => {
    const formData = new FormData();
    formData.append("image", blobInfo.blob());
    console.log("blobInfo.blob()", blobInfo.blob());

    const urlimage = uploadCoverArticle(formData)
      .unwrap()
      .then((response) => {
        return `https://digiland-app.iran.liara.run${response}`;
      })
      .catch((error) => {
        throw new Error("Image upload failed : " + error.message);
      });
    return urlimage;
  },[]);

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
