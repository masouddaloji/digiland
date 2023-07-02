import { useCallback, useState } from "react";
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
import { useUploadCoverArticleMutation } from "../../features/article/articleApiSlice";

const Uploader = (props) => {
  const [field, meta, helpers] = useField(props);
  const [selectedImages, setSelectedImages] = useState([]);
  const [
    uploadProfile,
    {
      isLoading: profileLoading,
      isSuccess: profileSuccess,
      error: profileError,
    },
  ] = useUploadProfileMutation();
  const [
    uploadProductCover,
    { isLoading: coverLoading, isSuccess: coverSuccess, error: coverError },
  ] = useUploadProductCoverMutation();
  const [
    uploadProductGallery,
    {
      isLoading: galleryLoading,
      isSuccess: gallerySuccess,
      error: galleryError,
    },
  ] = useUploadProductGalleryMutation();

  const [
    uploadCoverArticle,
    {
      isLoading: articleLoading,
      isSuccess: articleSuccess,
      error: articleError,
    },
  ] = useUploadCoverArticleMutation();

  const prepareImagesForUpload = useCallback((event) => {
    helpers.setTouched(true);
    let files = Array.from(event?.target?.files);
    if (files.length > 0) {
      setSelectedImages(files);
    }
  },[]);
  const uploadHandler = useCallback(async (e) => {
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
    } else {
      formData.append("image", selectedImages[0]);
      uploadCoverArticle(formData)
        .unwrap()
        .then((response) => {
          helpers.setValue(response);
        })
        .catch((error) => console.log("error in uploader", error));
    }
  },[]);

  const showErrorMeassage =useCallback( () => {
    switch (props.typeuploader) {
      case "product-multi":
        return persianTexts.uploader.productMulti.error;
      case "product-single":
        return persianTexts.uploader.productsingle.error;
      case "profileUploader":
        return persianTexts.uploader.profile.error;
      case "articleUploader":
        return persianTexts.uploader.profile.error;
      default:
        break;
    }
  },[]);

  return (
    <>
      <div className="formControl__wrapper">
        <div className={`inputBox`}>
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
            (coverLoading ||
              galleryLoading ||
              profileLoading ||
              coverSuccess ||
              gallerySuccess ||
              profileSuccess ||
              articleLoading ||
              articleSuccess) && selectedImages?.length && 
            "uploader__progress--show"
          }`}
        >
          <div
            className={`uploader__progressbar ${
              (coverLoading ||
                galleryLoading ||
                profileLoading ||
                articleLoading) &&
              "uploader__progressbar--loading"
            }

            ${
              (coverSuccess ||
                gallerySuccess ||
                profileSuccess ||
                articleSuccess) &&
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
        {(coverError || galleryError || profileError || articleError) && (
          <div className="uploadResult__wrapper">
            <p className="upload__resultText">{showErrorMeassage()}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Uploader;
