import React, { useRef } from "react";
// variables
import { persianTexts } from "../../../text";
// components
import FormControl from "../../FormControl/FormControl";

// library
import { Form, Formik } from "formik";
// icons
import { MdUploadFile, MdOutlineDriveFolderUpload } from "react-icons/md";
// validator
import { addProductsSchema } from "../../Validator/Validator";
// styles
import "./AddProduct.css";

const AddProduct = () => {
  const uploadRef=useRef()
  const ratingOptions=[
    {value:"",text:"لطفا امتیاز محصول را انتخاب کنید"},
    {value:1,text:"بد"},
    {value:2,text:"معمولی"},
    {value:3,text:"خوب"},
    {value:4,text:"خیلی خوب"},
    {value:5,text:"عالی"},
  ]
  const colorOptions=[
    {value:"red",text:"قرمز",color:"#FF0000"},
    {value:"black",text:"مشکی",color:"#000"},
    {value:"gold",text:"طلایی",color:"#ffd300"},
    {value:"blue",text:"آبی",color:"#0000FF"},
    {value:"green",text:"سبز",color:"#00FF00"},
    {value:"white",text:"سفید",color:"#FFF"},
    {value:"pink",text:"صورتی",color:"#FF69B4"},
  ]
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
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {(formik) => (
        <>
          {console.log("formik", formik)}

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
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderTitle
                      }
                      type="text"
                      name="productTitle"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelPrice}
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderPrice
                      }
                      type="text"
                      name="productPrice"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelRating}
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderRating
                      }
                      type="select"
                      name="productRating"
                      options={ratingOptions}
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelQuantity
                      }
                      placeHolder={
                        persianTexts.admin.products.placeholder.inputPlaceholderQuantity
                      }
                      type="text"
                      Placeholder
                      name="productQantity"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelCategory
                      }
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderCategory
                      }
                      type="text"
                      name="productCategory"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelSegment
                      }
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderSegment
                      }
                      type="text"
                      name="productSegment"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelColors}
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderColors
                      }
                      type="checkbox"
                      name="productColors"
                      options={colorOptions}
                    />
                  </div>

                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelBrand}
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderBrand
                      }
                      type="text"
                      name="productBrand"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label.inputLabelOffPrice
                      }
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderOffPrice
                      }
                      type="text"
                      name="productOffPrice"
                    />
                  </div>
                  <div className="col-md-6">
                    <FormControl
                      label={
                        persianTexts.admin.products.label
                          .inputLabelShortDescription
                      }
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderShortDescription
                      }
                      type="text"
                      name="productShortDescription"
                    />
                  </div>
                  <div className="col-12">
                    <FormControl
                      label={
                        persianTexts.admin.products.label
                          .inputLabelFullDescription
                      }
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderFullDescription
                      }
                      type="textarea"
                      name="productFullDescription"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormControl
                      label={persianTexts.admin.products.label.inputLabelCover}
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderCover
                      }
                      type="file"
                      accept="image/*"
                      name="productCover"
                      icon={<MdUploadFile className="uploader__icon" />}

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
                      placeHolder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderGallery
                      }
                      type="file"
                      accept="image/*"
                      name="productGallery"
                      multiple
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
                    // disabled={!(formik.dirty && formik.isValid)}
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
