import { useEffect, useRef, useState } from "react";
// packages
import { Field, useField, useFormikContext } from "formik";
//components
import { privateAxios } from "../../api/axios";
//hooks
import useAuth from "../../hooks/useAuth";

// icons
import { MdOutlineDriveFolderUpload } from "react-icons/md";

const Uploader = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue, setFieldTouched,resetForm } = useFormikContext();
  const [previewImage, setPreviewImage] = useState(
    field.value ? field.value : []
  );
  const [uploadImagePercent, setUploadImagePercent] = useState(null);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [images, setImages] = useState([]);
  const uploaderRef = useRef();

  const { auth } = useAuth();
  const message = {
    single: "کاور محصول آپلود شد",
    multiple: "عکس های محصول آپلود شدند",
  };

  const uploadHandler = (event) => {
    setFieldTouched(field.name, true);
    let files = Array.from(event?.target?.files);
    if (files.length > 0) {
      setImages(files);
    }
  };
  const uploading = (e) => {
    e.preventDefault();
    const imageData = new FormData();
    if (!props.multiple) {
      imageData.append("image", images[0]);
      setPreviewImage(images);
      uploadProduct("upload/prodimg", imageData);
    } else {
      images.map((img) => {
        imageData.append("images", img);
      });
      setPreviewImage(images);
      uploadProduct("upload/prodgallery", imageData);
    }
  };

  const uploadProduct = async (url, data) => {
    await privateAxios
      .post(url, data, {
        onUploadProgress: (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          setUploadImagePercent(percent);
        },
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsShowMessage(true);
        if (props.multiple) {
          setFieldValue(field.name, res.data.galleryArray);
        } else {
          setFieldValue(field.name, res.data.path);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setUploadImagePercent(0);
      });
  };

  useEffect(() => {
    if (!field.value) {
      setIsShowMessage(false);
    }
  }, [field.value]);



  return (
    <>
      <div className="formControl__wrapper">
        <div
          className={`uploader ${
            meta.touched && meta.error && !images?.length
              ? "formControl--invalid"
              : undefined
          }`}
          ref={uploaderRef}
        >
          <label htmlFor={field.name} className="uploader__label">
            <MdOutlineDriveFolderUpload className="uploader__icon" />
            {props.placeholder}
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

        {meta.touched && meta.error && !images?.length && (
          <span className="auth__error">{meta.error}</span>
        )}
      </div>

      <div
        className={`uploader__progress ${
          meta.value && "uploader__progress--show"
        }`}
      >
        <div
          className="uploader__progressbar"
          style={{ width: `${uploadImagePercent}%` }}
        ></div>
      </div>

      <button
        onClick={uploading}
        className={`uploader__btn ${images?.length && "uploader__btn--show"}`}
      >
        آپلود
      </button>
      {isShowMessage && (
        <div className="uploadResult__wrapper">
          <p className="upload__resultText">
            {props?.multiple ? message.multiple : message.single}
          </p>
          <div className="upload__showImages">
            {previewImage.length &&
              field.value &&
              previewImage.map((item, index) => (
                <img
                  className="upload__previewImage"
                  key={index + 1}
                  src={URL.createObjectURL(item)}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Uploader;
