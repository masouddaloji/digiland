import React from 'react'
// variables
import { persianTexts } from "../../../text";
// components
import Input from "./../../Input/Input";
// library
import { Form, Formik } from "formik";
// icons
import { MdUploadFile,MdOutlineDriveFolderUpload } from 'react-icons/md';
// styles
import './AddProduct.css'

const AddProduct = () => {
  return (
    <Formik
    initialValues={{
      productTitle: "",
      productPrice: "",
      productRating: "",
      productQantity: "",
      productCategory: "",
      productSegment: "",
      productColors: "",
      productBrand: "",
      productOffPrice: "",
      productShortDescription: "",
      productFullDescription: "",
      productCover: null,
      productGallery: null,
    }}
    onSubmit={(values,{resetForm})=>{
      console.log(values)
      resetForm()
    }}
  >
    {(formik) => (
      <>
        {console.log("formik",formik)}
     
      <section className="adminSection">
        <div className="table__wrapper">
          <h2 className="table__header">
            {persianTexts.admin.products.label.addProductsTitle}
          </h2>
          <Form className="full--width">
            <div className="row">
              <div className="col-md-6">
                <Input
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
                <Input
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
                <Input
                  label={persianTexts.admin.products.label.inputLabelRating}
                  placeHolder={
                    persianTexts.admin.products.placeholder
                      .inputPlaceholderRating
                  }
                  type="text"
                  name="productRating"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={persianTexts.admin.products.label.inputLabelQuantity}
                  placeHolder={
                    persianTexts.admin.products.placeholder
                      .inputPlaceholderQuantity
                  }
                  type="text"
                  Placeholder
                  name="productQantity"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={persianTexts.admin.products.label.inputLabelCategory}
                  placeHolder={
                    persianTexts.admin.products.placeholder
                      .inputPlaceholderCategory
                  }
                  type="text"
                  name="productCategory"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={persianTexts.admin.products.label.inputLabelSegment}
                  placeHolder={
                    persianTexts.admin.products.placeholder
                      .inputPlaceholderSegment
                  }
                  type="text"
                  name="productSegment"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={persianTexts.admin.products.label.inputLabelColors}
                  placeHolder={
                    persianTexts.admin.products.placeholder
                      .inputPlaceholderColors
                  }
                  type="text"
                  name="productColors"
                />
              </div>

              <div className="col-md-6">
                <Input
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
                <Input
                  label={persianTexts.admin.products.label.inputLabelOffPrice}
                  placeHolder={
                    persianTexts.admin.products.placeholder
                      .inputPlaceholderOffPrice
                  }
                  type="text"
                  name="productOffPrice"
                />
              </div>
              <div className="col-md-6">
                <Input
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
              <div className="col-md-6">
                <Input
                  label={
                    persianTexts.admin.products.label
                      .inputLabelFullDescription
                  }
                  placeHolder={
                    persianTexts.admin.products.placeholder
                      .inputPlaceholderFullDescription
                  }
                  type="text"
                  name="productFullDescription"
                />
              </div>
              
            </div>
            <div className="row">
            <div className="col-md-6">
                <Input
                  label={
                    persianTexts.admin.products.label
                      .inputLabelCover
                  }
                  placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderCover}
                  type="file"
                  name="productCover"
                  icon={<MdUploadFile className='uploader__icon'/>}
                />
              </div>
            <div className="col-md-6">
                <Input
                  label={
                    persianTexts.admin.products.label
                      .inputLabelGallery
                  }
                  icon={<MdOutlineDriveFolderUpload className='uploader__icon'/>}
                  placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderGallery}
                  type="file"
                  name="productGallery"
                  multiple
                  
                />
              </div>
            </div>
            <div className="row btn__wrapper">
          <button className={`admin__btn ${(formik.dirty && formik.isValid)?"btn--active":"btn--disable"}`} type="submit" disabled={!(formik.dirty && formik.isValid)}>{persianTexts.admin.products.btn}</button>
            </div>
          </Form>
        </div>
      </section>
      </>
    )}
  </Formik>
  )
}

export default AddProduct