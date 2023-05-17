import { useEffect, useRef, useState } from "react";
//packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
// variables
import { persianTexts } from "../../../text";
//redux
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../features/productsSlice";
// components
import axios from "./../../../api/axios";
import privateAxios from "../../../api/privateAxios"; 
import Error from "../../Error/Error";
import Table from "../Table/Table";
import Star from "../../Star/Star";
import FormControl from "../../FormControl/FormControl";
import  CustomPagination  from "../../Pagination/CustomPagination";
//hooks
import useAuth from "../../../hooks/useAuth";
// validator
import { addProductsSchema } from "../../Validator/Validator";
//icons
import { IoMdClose } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdUploadFile, MdOutlineDriveFolderUpload } from "react-icons/md";
//constannst
import { ratingOptions, colorOptions } from "../../../Constants";

// styles
import "./AdminProducts.css";
import LoaderComponent from "../../Loader/LoaderComponent";

const AdminProducts = () => {
  const dispatch=useDispatch()
  const [pageInfo, setPageInfo] = useState({
    isLoading: false,
    data: [],
    page: 1,
    pageSize: 10,
    pageCount:null
  });
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productEditDetails, setProductEditDetails] = useState({});
  const editRef = useRef();
  const { auth } = useAuth();
  
  const getProducts = async () => {
    try {
      setPageInfo((prev) => ({ ...prev, isLoading: true }));
      await axios
        .get(`products?page=${pageInfo.page}&limit=${pageInfo.pageSize}`)
        .then((res) =>
          setPageInfo((prev) => ({
            ...prev,
            isLoading: false,
            data: res.data.data,
            pageCount: res.data.lastPage,
          }))
        );
    } catch (err) {
      toast.error("Error fetching products");
    }
  };

  const removeProductHandler = async (productID) => {
    try {
      await privateAxios
        .delete(`products/${productID}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            toast.success(persianTexts.adminpanel.removeProductSuccess);
            getProducts();
          } else {
            toast.error(persianTexts.adminpanel.removeProductError);
          }
        });
    } catch (error) {
      toast.error("Error removing product");
    }
  };

  useEffect(() => {
    getProducts();
  }, [pageInfo.page,pageInfo.pageSize]);

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
                productCategory: productEditDetails?.tags,
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
              onSubmit={async (values, { resetForm }) => {
                const data = {
                  title: values.productTitle,
                  segment: values.productSegment,
                  image: values.productCover,
                  gallery: values.productGallery,
                  offPrice: Number(values.productOffPrice),
                  price: Number(values.productPrice),
                  rating: Number(values.productRating),
                  quantity: Number(values.productQantity),
                  colors: values.productColors,
                  category: values.productSubCategory,
                  tags: values.productCategory,
                  shortDescription: values.productShortDescription,
                  fullDescription: values.productFullDescription,
                  brand: values.productBrand,
                };
                  dispatch(updateProduct({data,token:auth?.token,id:productEditDetails?._id}))
                // await privateAxios
                //   .put(`products/${productEditDetails?._id}`, data, {
                //     headers: {
                //       Authorization: `Bearer ${auth?.token}`,
                //       "Content-Type": "application/json",
                //     },
                //   })
                //   .then((res) => {
                //     if (res.status === 200) {
                //       toast.success(persianTexts.adminpanel.editProductSuccess);
                //       setIsShowEditModal(false);
                //       getProducts();
                //     } else {
                //       toast.error(persianTexts.adminpanel.editProductError);
                //     }
                //   })
                //   .catch((err) => console.log(err));
              }}
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
          {!pageInfo.isLoading?<>
          <tbody>
            {pageInfo.data.map((item) => (
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
          </>:<LoaderComponent />}
            
        </table>
      </Table>
      <CustomPagination setData={setPageInfo} page={pageInfo.page} count={pageInfo.pageCount}/>
      </>

  
  );
};

export default AdminProducts;
