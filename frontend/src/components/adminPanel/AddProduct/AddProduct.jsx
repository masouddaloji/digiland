import { useCallback, useRef } from "react";
// packages
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// persian text
import { persianTexts } from "../../../text";
// components
import FormControl from "../../FormControl/FormControl";
//rtk query
import { useAddProductMutation } from "../../../features/Product/ProductApiSlice";
//hooks
import useTitle from "../../../hooks/useTitle";
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
  const tableRef = useRef();
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
  const createNewProduct = useCallback((productinfos) => {
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
        navigate("/adminproducts");
      })
      .catch((error) => {
        toast.error(persianTexts.addProducts.createProductError);
      });
  },[]);
  useTitle("افزودن محصول");
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addProductsSchema}
      onSubmit={async (values, { resetForm }) => {
        await createNewProduct(values);
        resetForm();
      }}
    >
      {(formik) => (
        <>
          <div className="table" ref={tableRef}>
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
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelTitle}
                    controler="text"
                    name="productTitle"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelPrice}
                    controler="text"
                    name="productPrice"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelRating}
                    controler="select"
                    selectType="color"
                    name="productRating"
                    options={ratingOptions}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelQuantity}
                    controler="text"
                    name="productQantity"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelCategory}
                    controler="text"
                    name="productCategory"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelSegment}
                    controler="text"
                    name="productSegment"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelColors}
                    controler="checkbox"
                    name="productColors"
                    options={colorOptions}
                    ref={tableRef}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelBrand}
                    controler="text"
                    name="productBrand"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={
                      persianTexts.admin.products.label.inputLabelSubCategory
                    }
                    controler="text"
                    name="productSubCategory"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelOffPrice}
                    controler="text"
                    name="productOffPrice"
                  />
                </div>
                <div className="col-12">
                  <FormControl
                    label={
                      persianTexts.admin.products.label
                        .inputLabelShortDescription
                    }
                    controler="editor"
                    name="productShortDescription"
                    height={300}
                  />
                </div>

                <div className="col-12">
                  <FormControl
                    label={
                      persianTexts.admin.products.label
                        .inputLabelFullDescription
                    }
                    controler="editor"
                    name="productFullDescription"
                    height={300}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
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
                    typeuploader="product-single"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl
                    label={persianTexts.admin.products.label.inputLabelGallery}
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
                    typeuploader="product-multi"
                  />
                </div>
              </div>
              <div className="row btn__wrapper">
                <button
                  className={`admin__btn ${
                    formik.dirty && formik.isValid && "admin__btn--active"
                  }`}
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  {persianTexts.addProducts.submitBtn}
                </button>
              </div>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
};

export default AddProduct;
