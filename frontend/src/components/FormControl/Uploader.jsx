import { useState } from "react";
// packages
import { nanoid } from "@reduxjs/toolkit";
import { useField } from "formik";
//rtk query
import {
  useUploadProductCoverMutation,
  useUploadProductGalleryMutation,
} from "../../features/Product/ProductApiSlice";
//persian text
import { persianTexts } from "../../text";
// icons
import { MdOutlineDriveFolderUpload } from "react-icons/md";

const Uploader = (props) => {
  const [field, meta, helpers] = useField(props);
  const [selectedImages, setSelectedImages] = useState([]);
  const [
    uploadProductCover,
    {
      isLoading: coverUploadLoading,
      isSuccess: coverUploadSuccess,
      isError: coverUploadError,
      error,
    },
  ] = useUploadProductCoverMutation();
  const [
    uploadProductGallery,
    {
      isLoading: galleryUploadLoading,
      isSuccess: galleryUploadSuccess,
      isError: galleryUploadError,
      error: galleryError,
    },
  ] = useUploadProductGalleryMutation();

  const prepareImagesForUpload = (event) => {
    helpers.setTouched(true);
    let files = Array.from(event?.target?.files);
    if (files.length > 0) {
      setSelectedImages(files);
    }
  };
  const uploadHandler = async (e) => {
    e.preventDefault();
    const formData = await new FormData();
    if (props.multiple) {
      selectedImages.map((image) => formData.append("images", image));
      uploadProductGallery(formData)
        .unwrap()
        .then((response) => {
          helpers.setValue(response);
        })
        .catch((error) => console.log("error in uploader", error));
    } else {
      formData.append("image", selectedImages[0]);
      uploadProductCover(formData)
        .unwrap()
        .then((response) => {
          helpers.setValue(response);
        })
        .catch((error) => console.log("error in uploader", error));
    }
  };

  return (
    <>
      <div className="formControl__wrapper">
        <div
          className={`uploader ${
            meta.touched && meta.error && !selectedImages?.length
              ? "formControl--invalid"
              : undefined
          }`}
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
            onChange={prepareImagesForUpload}
            value=""
          />
        </div>

        {meta.touched && meta.error && !selectedImages?.length && (
          <span className="auth__error">{meta.error}</span>
        )}
      </div>

      <div
        className={`uploader__progress ${
          (coverUploadLoading || galleryUploadLoading) &&
          "uploader__progress--show"
        }`}
      >
        <div className={`uploader__progressbar `}></div>
      </div>

      <button
        onClick={uploadHandler}
        className={`uploader__btn ${
          selectedImages?.length && "uploader__btn--show"
        }`}
      >
        آپلود
      </button>

      <div className="uploadResult__wrapper">
        {(coverUploadSuccess || galleryUploadSuccess) && (
          <p className="upload__resultText">
            {props?.multiple
              ? persianTexts.uploader.multiple
              : persianTexts.uploader.single}
          </p>
        )}
        <div className="upload__showImages">
          {props?.multiple && field.value ? (
            field.value.map((item) => (
              <div className="upload__previewBox">
                <img
                  className="upload__previewImage"
                  key={nanoid()}
                  src={`http://localhost:8000${item}`}
                />
              </div>
            ))
          ) : field.value ? (
            <div className="upload__previewBox">
              <img
                className="upload__previewImage"
                src={`http://localhost:8000${field.value}`}
              />
            </div>
          ) : null}
        </div>
      </div>

      {(coverUploadError || galleryUploadError) && (
        <div className="uploadResult__wrapper">
          <p className="upload__resultText">
            {props?.multiple
              ? persianTexts.uploader.multipleError
              : persianTexts.uploader.singleError}
          </p>
        </div>
      )}
    </>
  );
};

export default Uploader;
