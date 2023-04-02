import React, { useContext, useRef, useState } from "react";
// packages
import { Field, useField, useFormikContext } from "formik";
//components
import { privateAxios } from "../../api/axios";
//hooks
import useAuth from "../../hooks/useAuth";
// contexts
import { AuthContext } from "../../Context/AuthContext";
// icons
import { MdOutlineDriveFolderUpload } from "react-icons/md";

const Uploader = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [previewImage, setPreviewImage] = useState([]);
  const [uploadImagePercent, setUploadImagePercent] = useState(null);
  const [resultUpload, setResultUpload] = useState(false);
  const uploaderRef = useRef();
  const authContext = useContext(AuthContext);
  const {auth}=useAuth()

  const uploadHandler = (event) => {
    event.preventDefault()
    let files = event.target.files;
    let arrayFiles = Array.from(files);
    setFieldValue(field.name, arrayFiles);
  };

  const uploadProduct = async (url, data) => {
  
    await privateAxios
      .post(url, data, {
        onUploadProgress: (progress) => {
          const percent = Math.round((progress.loaded / progress.total)* 100 );
          setUploadImagePercent(percent);
        },
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        
        setResultUpload(true);
        if (props.multiple) {
          sendUploadUrl(res.data.galleryArray,"multi");
        } else {
          sendUploadUrl(res.data.path,"single");
        }
      })
      .catch((err) => {
        console.log("err", err);
        setUploadImagePercent(0)
      });
  };

  const uploading =  (e,files) => {
    e.preventDefault()
    if (!props.multiple) {
      const coverData = new FormData();
       coverData.append("image", files[0]);
       setPreviewImage(files);
      uploadProduct("upload/prodimg", coverData);
    } else {
      const galleryData = new FormData();
      const arrayGalleries = [];
      for (const item of files) {
        galleryData.append("images", item);
         arrayGalleries.push(item);
      }
       setPreviewImage(arrayGalleries);
      uploadProduct("upload/prodgallery", galleryData);
    }
  };

  const sendUploadUrl=(url,type)=>{
    props.saveUploadHandler(url,type)
  }
  return (
    <>
      <div className="formControl__wrapper">
        <div
          className={`uploader ${
            meta.touched && meta.error ? "formControl--invalid" : undefined
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

        {meta.touched && meta.error && (
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
        onClick={(e) => uploading(e,meta.value)}
        className={`uploader__btn ${meta.value && "uploader__btn--show"}`}
      >
        آپلود
      </button>
      {resultUpload && (
        <div className="uploadResult__wrapper">

       
          <p className="upload__resultText">عکس های محصول آپلود شدند</p>
          <div className="upload__showImages">

    
          {previewImage.length &&
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
