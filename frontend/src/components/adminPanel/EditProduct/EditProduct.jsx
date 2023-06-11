//packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
//rtk query
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../features/Product/ProductApiSlice";
// variables
import { persianTexts } from "../../../text";
// components
import FormControl from "../../FormControl/FormControl";
// validator
import { addProductsSchema } from "../../Validator/Validator";
//icons
import { MdUploadFile, MdOutlineDriveFolderUpload } from "react-icons/md";
//constannst
import { ratingOptions, colorOptions } from "../../../Constants";
//styles
import "./EditProduct.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productID } = useParams();
  console.log("productID", productID);
  const {
    data: productInfo,
    isLoading,
    isSuccess,
  } = useGetProductByIdQuery(productID);
  const [updateProduct] = useUpdateProductMutation();
  const updateProductHandler = (productInfos) => {
    const data = {
      title: productInfos.productTitle,
      segment: productInfos.productSegment,
      image: productInfos.productCover,
      gallery: productInfos.productGallery,
      offPrice: Number(productInfos.productOffPrice),
      price: Number(productInfos.productPrice),
      rating: Number(productInfos.productRating),
      quantity: Number(productInfos.productQantity),
      colors: productInfos.productColors,
      category: productInfos.productSubCategory,
      subCategory: productInfos.productCategory,
      shortDescription: productInfos.productShortDescription,
      fullDescription: productInfos.productFullDescription,
      brand: productInfos.productBrand,
    };
    updateProduct({ data, productID })
      .unwrap()
      .then((response) => {
        toast.success(persianTexts.editProduct.editProductSuccess);
        navigate("/adminpanel/products");
      })
      .catch((error) => {
        console.log("errore", error);
        toast.error(persianTexts.editProduct.editProductError);
      });
  };
  return (
    <>
      {isSuccess ? (
        <div className="table">
          <div className="table__header">
            <h5 className="table__title">{persianTexts.editProduct.header}</h5>
            <Link to="/adminproducts" className="table__link">
              {persianTexts.editProduct.returntoProductPage}
            </Link>
          </div>
          <div className="edit__content">
            <Formik
              initialValues={{
                productTitle: productInfo?.title,
                productPrice: productInfo?.price,
                productRating: productInfo?.rating,
                productQantity: productInfo?.quantity,
                productCategory: productInfo?.subCategory,
                productSegment: productInfo?.segment,
                productColors: productInfo?.colors,
                productBrand: productInfo?.brand,
                productSubCategory: productInfo?.category,
                productOffPrice: productInfo?.offPrice,
                productShortDescription: productInfo?.shortDescription,
                productFullDescription: productInfo?.fullDescription,
                productCover: productInfo?.image,
                productGallery: productInfo?.gallery,
              }}
              validationSchema={addProductsSchema}
              onSubmit={(values) => updateProductHandler(values)}
            >
              {(formik) => (
                <>
                  <Form className="edit__form">
                    <div className="row">
                      <div className="col-md-6">
                        <FormControl
                          label={
                            persianTexts.admin.products.label.inputLabelTitle
                          }
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
                          label={
                            persianTexts.admin.products.label.inputLabelPrice
                          }
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
                          label={
                            persianTexts.admin.products.label.inputLabelRating
                          }
                          placeholder={
                            persianTexts.admin.products.placeholder
                              .inputPlaceholderRating
                          }
                          controler="select"
                          name="productRating"
                          options={ratingOptions}
                          selectType="rating"
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
                          label={
                            persianTexts.admin.products.label.inputLabelColors
                          }
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
                          label={
                            persianTexts.admin.products.label.inputLabelBrand
                          }
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
                            persianTexts.admin.products.label
                              .inputLabelSubCategory
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
                          label={
                            persianTexts.admin.products.label.inputLabelCover
                          }
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
                          images={productInfo?.gallery}
                          typeuploader="product-multi"
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
                        {persianTexts.editProduct.submitBtn}
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditProduct;
