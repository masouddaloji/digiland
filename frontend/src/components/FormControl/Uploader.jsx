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
import { useUploadProfileMutation } from "../../features/user/userApiSlice";

const Uploader = (props) => {
  const [field, meta, helpers] = useField(props);
  const [selectedImages, setSelectedImages] = useState([]);
  const [
    uploadProfile,
    {
      isLoading: profileUploadLoading,
      isSuccess: profileUploadSuccess,
      error: profileUploadError,
    },
  ] = useUploadProfileMutation();
  const [
    uploadProductCover,
    {
      isLoading: coverUploadLoading,
      isSuccess: coverUploadSuccess,
      error: coverUploadError,
    },
  ] = useUploadProductCoverMutation();
  const [
    uploadProductGallery,
    {
      isLoading: galleryUploadLoading,
      isSuccess: galleryUploadSuccess,
      error: galleryUploadError,
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
    const formData = new FormData();
    if (props.typeuploader === "product-multi") {
      selectedImages.map((image) => formData.append("images", image));
      uploadProductGallery(formData)
        .unwrap()
        .then((response) => {
          helpers.setValue(response);
        })
        .catch((error) => console.log("error in uploader", error));
    } else if (props.typeuploader === "product-single") {
      formData.append("image", selectedImages[0]);
      uploadProductCover(formData)
        .unwrap()
        .then((response) => {
          helpers.setValue(response);
        })
        .catch((error) => console.log("error in uploader", error));
    } else if (props.typeuploader === "profileUploader") {
      formData.append("image", selectedImages[0]);
      uploadProfile(formData)
        .unwrap()
        .then((response) => {
          helpers.setValue(response);
        })
        .catch((error) => console.log("error in uploader", error));
    }
  };

  const showErrorMeassage = () => {
    switch (props.typeuploader) {
      case "product-multi":
        return persianTexts.uploader.productMulti.error;
      case "product-single":
        return persianTexts.uploader.productsingle.error;
      case "profileUploader":
        return persianTexts.uploader.profile.error;
      default:
        break;
    }
  };

  return (
    <>
      <div className="formControl__wrapper">
        <div className={`inputBox`}>
          {props.label && (
            <label
              htmlFor={field.name}
              className={`input__label ${
                meta.touched && meta.error && "label--invalid"
              }`}
            >
              {props.label}
            </label>
          )}

          <div
            className={`uploader ${
              meta.touched &&
              meta.error &&
              !selectedImages?.length &&
              "input--invalid"
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
        </div>
        {meta.touched && meta.error && !selectedImages?.length && (
          <span className="auth__error">{meta.error}</span>
        )}

        <div
          className={`uploader__progress ${
            (coverUploadLoading ||
              galleryUploadLoading ||
              profileUploadLoading ||
              coverUploadSuccess ||
              galleryUploadSuccess ||
              profileUploadSuccess) &&
            "uploader__progress--show"
          }`}
        >
          <div
            className={`uploader__progressbar ${
              coverUploadLoading ||
              galleryUploadLoading ||
              (profileUploadLoading && "uploader__progressbar--loading")
            }

            ${
              (coverUploadSuccess ||
                galleryUploadSuccess ||
                profileUploadSuccess) &&
              "uploader__progressbar--complite"
            } 
                `}
          ></div>
        </div>

        <button
          onClick={uploadHandler}
          className={`uploader__btn ${
            selectedImages?.length && "uploader__btn--show"
          }`}
        >
          آپلود
        </button>

        {field.value && (
          <div className="uploadResult__wrapper">
            <div className="upload__showImages">
              {field?.value?.length &&
              props.typeuploader === "product-multi" ? (
                field.value.map((item) => (
                  <div className="upload__previewBox" key={nanoid()}>
                    <img
                      className="upload__previewImage"
                      src={`http://localhost:8000${item}`}
                    />
                  </div>
                ))
              ) : field?.value?.length &&
                props.typeuploader !== "product-multi" ? (
                <div className="upload__previewBox">
                  <img
                    className="upload__previewImage"
                    src={`http://localhost:8000${field.value}`}
                  />
                </div>
              ) : null}
            </div>
          </div>
        )}
        {(coverUploadError || galleryUploadError || profileUploadError) && (
          <div className="uploadResult__wrapper">
            <p className="upload__resultText">{showErrorMeassage()}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Uploader;
