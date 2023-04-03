import React, { useContext, useRef, useState } from "react";
// variables
import { persianTexts } from "../../../text";
// components
import FormControl from "../../FormControl/FormControl";
import { privateAxios } from "../../../api/axios";

// packages
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
//hooks
import useAuth from "../../../hooks/useAuth";
// icons
import { MdUploadFile, MdOutlineDriveFolderUpload } from "react-icons/md";
// validator
import { addProductsSchema } from "../../Validator/Validator";
// contexts
import { AuthContext } from "../../../Context/AuthContext";
// styles
import "./AddProduct.css";

const AddProduct = () => {
  const authContext = useContext(AuthContext);
  const uploadRef = useRef();
  const [cover, setCover] = useState(null);
  const [gallery, setGallery] = useState([]);
  const { auth } = useAuth();
  const ratingOptions = [
    { value: 1, text: "بد" },
    { value: 2, text: "معمولی" },
    { value: 3, text: "خوب" },
    { value: 4, text: "خیلی خوب" },
    { value: 5, text: "عالی" },
  ];
  const colorOptions = [
    { value: "red", text: "قرمز", color: "#FF0000" },
    { value: "black", text: "مشکی", color: "#000" },
    { value: "gold", text: "طلایی", color: "#ffd300" },
    { value: "blue", text: "آبی", color: "#0000FF" },
    { value: "green", text: "سبز", color: "#00FF00" },
    { value: "white", text: "سفید", color: "#FFF" },
    { value: "pink", text: "صورتی", color: "#FF69B4" },
  ];
  const saveUploadHandler = (values, type) => {
    console.log(values, type);
    switch (type) {
      case "multi": {
        setGallery(values);
        break;
      }

      case "single": {
        setCover(values);
        break;
      }

      default:
        break;
    }
  };
  return (
    <Formik
      initialValues={{
        productTitle: "",
        productPrice: "",
        productRating: "",
        productQantity: "",
        productCategory: "",
        productSegment: "",
        productColors: null,
        productBrand: "",
        productOffPrice: "",
        productShortDescription: "",
        productFullDescription: "",
        productCover: null,
        productGallery: null,
      }}
      validationSchema={addProductsSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log("gallery",gallery)
        const data = {
          title: values.productTitle,
          segment: values.productSegment,
          image: cover,
          gallery: gallery,
          offPrice: Number(values.productOffPrice),
          price: Number(values.productPrice),
          rating: Number(values.productRating),
          quantity: Number(values.productQantity),
          colors: values.productColors,
          category: values.productCategory,
          shortDescription: values.productShortDescription,
          fullDescription: values.productFullDescription,
          brand: values.productBrand,
        };

        await privateAxios
          .post("products", JSON.stringify(data), {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("محصول با موفقیت افزوده شد");
              resetForm();
            }
          })
          .catch((err) => {
            toast.error("ثبت محصول با خطا مواجه شد");
            console.log(err);
          });
      }}
    >
      {(formik) => (
        <>
          {/* {console.log("formik", formik)} */}

          <section className="adminSection">
            <div className="table__wrapper">
              <h2 className="table__header">
                {persianTexts.admin.products.label.addProductsTitle}
              </h2>
              <Form className="admin__form">
                <div className="row">
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelTitle}
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderTitle
                      }
                      controler="text"
                      name="productTitle"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelPrice}
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderPrice
                      }
                      controler="text"
                      name="productPrice"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelRating}
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderRating
                      }
                      controler="select"
                      name="productRating"
                      options={ratingOptions}
                    />
                  </div>

                  {/* <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelRating}
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderRating
                      }
                      type="select"
                      name="productRating"
                      options={ratingOptions}
                    />
                  </div> */}
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelQuantity
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderQuantity
                      }
                      controler="text"
                      name="productQantity"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelCategory
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderCategory
                      }
                      controler="text"
                      name="productCategory"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelSegment
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderSegment
                      }
                      controler="text"
                      name="productSegment"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelColors}
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderColors
                      }
                      controler="checkbox"
                      name="productColors"
                      options={colorOptions}
                    />
                  </div>

                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelBrand}
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderBrand
                      }
                      controler="text"
                      name="productBrand"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelOffPrice
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderOffPrice
                      }
                      controler="text"
                      name="productOffPrice"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label
                          .inputLabelShortDescription
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderShortDescription
                      }
                      controler="text"
                      name="productShortDescription"
                    />
                  </div>

                  <div className="col-12">
                    <FormControl
                      label={
                        persianTexts.admin.products.label
                          .inputLabelFullDescription
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderFullDescription
                      }
                      controler="editor"
                      name="productFullDescription"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelCover}
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderCover
                      }
                      controler="file"
                      accept="image/*"
                      name="productCover"
                      icon={<MdUploadFile className="uploader__icon" />}
                      saveUploadHandler={saveUploadHandler}
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelGallery
                      }
                      icon={
                        <MdOutlineDriveFolderUpload className="uploader__icon" />
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderGallery
                      }
                      controler="file"
                      accept="image/*"
                      name="productGallery"
                      multiple
                      saveUploadHandler={saveUploadHandler}
                    />
                  </div>
                </div>
                <div className="row btn__wrapper">
                  <button
                    className={`admin__btn ${
                      formik.dirty && formik.isValid
                        ? "btn--active"
                        : "btn--disable"
                    }`}
                    type="submit"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    {persianTexts.admin.products.btn}
                  </button>
                </div>
              </Form>
            </div>
          </section>
        </>
      )}
    </Formik>
  );
};

export default AddProduct;
