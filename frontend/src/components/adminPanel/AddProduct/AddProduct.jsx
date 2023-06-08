import { useRef } from "react";
// packages
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// variables
import { persianTexts } from "../../../text";
// components
import FormControl from "../../FormControl/FormControl";
//rtk query
import { useAddProductMutation } from "../../../features/Product/ProductApiSlice";
// icons
import { MdUploadFile, MdOutlineDriveFolderUpload } from "react-icons/md";
// validator
import { addProductsSchema } from "../../Validator/Validator";

//constannst
import { ratingOptions, colorOptions } from "../../../Constants";
// styles
import "./AddProduct.css";

const AddProduct = () => {
  const [addProduct] = useAddProductMutation();

  const navigate = useNavigate();
  let initialValues = {
    productTitle: "",
    productPrice: "",
    productRating: "",
    productQantity: "",
    productCategory: null,
    productSegment: "",
    productColors: null,
    productBrand: "",
    productSubCategory: "",
    productOffPrice: "",
    productShortDescription: "",
    productFullDescription: "",
    productCover: null,
    productGallery: null,
  };
  const createnewProduct = (productinfos) => {
    const data = {
      title: productinfos.productTitle,
      segment: productinfos.productSegment,
      image: productinfos.productCover,
      gallery: productinfos.productGallery,
      offPrice: Number(productinfos.productOffPrice),
      price: Number(productinfos.productPrice),
      rating: Number(productinfos.productRating),
      quantity: Number(productinfos.productQantity),
      colors: productinfos.productColors,
      category: productinfos.productCategory,
      subCategory: productinfos.productSubCategory,
      shortDescription: productinfos.productShortDescription,
      fullDescription: productinfos.productFullDescription,
      brand: productinfos.productBrand,
    };
    addProduct({ ...data })
      .unwrap()
      .then((response) => {
        toast.success(persianTexts.addProducts.createProductSuccess);
        navigate("/adminpanel/products");
      })
      .catch((error) => {
        toast.error(persianTexts.addProducts.createProductError);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addProductsSchema}
      onSubmit={async (values, { resetForm }) => {
        await createnewProduct(values);
        resetForm();
      }}
    >
      {(formik) => (
        <>
          <section className="adminSection">
            <div className="table">
              <div className="table__header">
                <h5 className="table__title">
                  {persianTexts.addProducts.header}
                </h5>
                <Link to="/adminproducts" className="table__link">
                  {persianTexts.addProducts.returntoProductPage}
                </Link>
              </div>
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
                      selectType="color"
                      name="productRating"
                      options={ratingOptions}
                    />
                  </div>
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
                        persianTexts.admin.products.label.inputLabelSubCategory
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderSubCategory
                      }
                      controler="text"
                      name="productSubCategory"
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
                  <div className="col-md-12">
                    <FormControl
                      label={
                        persianTexts.admin.products.label
                          .inputLabelShortDescription
                      }
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderShortDescription
                      }
                      controler="editor"
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
                    {persianTexts.addProducts.submitBtn}
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
