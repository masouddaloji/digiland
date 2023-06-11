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
      isError: profileUploadError,
    },
  ] = useUploadProfileMutation();
  const [
    uploadProductCover,
    {
      isLoading: coverUploadLoading,
      isSuccess: coverUploadSuccess,
      isError: coverUploadError,
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
  const showSuccessMeassage = () => {
    switch (props.typeuploader) {
      case "product-multi":
        return persianTexts.uploader.productMulti.success;
      case "product-single":
        return persianTexts.uploader.productsingle.success;
      case "profileUploader":
        return persianTexts.uploader.profile.success;
      default:
        break;
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
        <div className={`formControl__box`}>
          {props.label && (
            <label
              htmlFor={field.name}
              className={`formControl__label ${
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
              "formControl--invalid"
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

        {(coverUploadLoading ||
          galleryUploadLoading ||
          profileUploadLoading) && (
          <div
            className={`uploader__progress ${
              (coverUploadLoading ||
                galleryUploadLoading ||
                profileUploadLoading) &&
              "uploader__progress--show"
            }`}
          >
            <div className={`uploader__progressbar `}></div>
          </div>
        )}

        <button
          onClick={uploadHandler}
          className={`uploader__btn ${
            selectedImages?.length && "uploader__btn--show"
          }`}
        >
          آپلود
        </button>

        {(coverUploadSuccess || galleryUploadSuccess || profileUploadSuccess) &&
          field.value && (
            <div className="uploadResult__wrapper">
              <p className="upload__resultText">{showSuccessMeassage()}</p>

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
