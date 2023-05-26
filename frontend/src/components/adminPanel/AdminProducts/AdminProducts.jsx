import { useEffect, useRef, useState } from "react";
//packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
// variables
import { persianTexts } from "../../../text";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProducts,
  deleteProduct,
} from "../../../features/productsSlice";
// components
import Error from "../../Error/Error";
import Table from "../Table/Table";
import Star from "../../Star/Star";
import FormControl from "../../FormControl/FormControl";
import CustomPagination from "../../Pagination/CustomPagination";
//hooks
import useAuth from "../../../hooks/useAuth";
// validator
import { addProductsSchema } from "../../Validator/Validator";
//icons
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdUploadFile, MdOutlineDriveFolderUpload } from "react-icons/md";
//constannst
import { ratingOptions, colorOptions } from "../../../Constants";

// styles
import "./AdminProducts.css";
import LoaderComponent from "../../Loader/LoaderComponent";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { status, error, updateStatus, deleteStatus } = useSelector(
    (state) => state.products
  );
  const { data, hasNextPage, currentPage, lastPage, total } = useSelector(
    (state) => state.products.data
  );

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    countInPage: 10,
  });
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productEditDetails, setProductEditDetails] = useState({});
  const editRef = useRef();
  const { auth } = useAuth();
  const removeProductHandler = (id) => {
    dispatch(deleteProduct({id,token:auth?.token})).then(() =>
      dispatch(
        getProducts({ page: pageInfo.page, limit: pageInfo.countInPage })
      )
    );
  };
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
    dispatch(
      updateProduct({ data, token: auth?.token, id: productEditDetails?._id })
    ).then(() =>
      getProducts({
        page: pageInfo.page,
        limit: pageInfo.countInPage,
      })
    );
  };
  useEffect(() => {
    dispatch(getProducts({ page: pageInfo.page, limit: pageInfo.countInPage }));
  }, [pageInfo.page, pageInfo.countInPage]);

  return (
    <>
      {isShowEditModal && (
        <div
          className="edit__container"
          // onClick={(e)=>{
          //   if(e.target!==editRef?.current){
          //     setIsShowEditModal(false)
          //   }
          // }}
        >
          <div className="edit__content" ref={editRef}>
            <Formik
              initialValues={{
                productTitle: productEditDetails?.title,
                productPrice: productEditDetails?.price,
                productRating: productEditDetails?.rating,
                productQantity: productEditDetails?.quantity,
                productCategory: productEditDetails?.subCategory,
                productSegment: productEditDetails?.segment,
                productColors: productEditDetails?.colors,
                productBrand: productEditDetails?.brand,
                productSubCategory: productEditDetails?.category,
                productOffPrice: productEditDetails?.offPrice,
                productShortDescription: productEditDetails?.shortDescription,
                productFullDescription: productEditDetails?.fullDescription,
                productCover: productEditDetails?.image,
                productGallery: productEditDetails?.gallery,
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
                        {persianTexts.admin.products.btn}
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      )}
      <Table
        title="لیست محصولات"
        link="/adminpanel/add-products"
        linkTitle="افزودن محصول جدید"
      >
        <table>
          <thead>
            <tr>
              <td>عکس</td>
              <td>محصول</td>
              <td>قیمت</td>
              <td>تعداد</td>
              <td>دسته بندی</td>
              <td>برند</td>
              <td>امتیاز</td>
              <td>عملیات</td>
            </tr>
          </thead>
          {status === "success" ? (
            <>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="table__imageBox">
                        <img
                          src={`http://localhost:8000${item.image}`}
                          alt="product image"
                          className="table__img"
                        />
                      </div>
                    </td>
                    <td title={item.title}>{item.title}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>
                    <td>{item.brand}</td>
                    <td>{Star(item.rating)}</td>
                    <td>
                      <div className="actionBtns">
                        <span
                          className="edit"
                          title="ویرایش"
                          onClick={() => {
                            setIsShowEditModal(true);
                            setProductEditDetails({ ...item });
                          }}
                        >
                          <FiEdit className="actions__icon" />
                        </span>
                        <span
                          className="delete"
                          title="حذف"
                          onClick={() => removeProductHandler(item._id)}
                        >
                          <RiDeleteBinLine className="actions__icon" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <LoaderComponent />
          )}
        </table>
      </Table>
      {hasNextPage && (
        <CustomPagination
          setData={setPageInfo}
          page={currentPage}
          count={lastPage}
        />
      )}
    </>
  );
};

export default AdminProducts;
