import { useEffect, useState } from "react";
//packages
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../features/productsSlice";
import { selectToken } from "../../../features/auth/authSlice";
// components
import Table from "../Table/Table";
import Star from "../../Star/Star";
import CustomPagination from "../../Pagination/CustomPagination";
import LoaderComponent from "../../Loader/LoaderComponent";
//icons
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
// styles
import "./AdminProducts.css";
import Modal from "../../Modal/Modal";
import { useGetProductsQuery } from "../../../features/Product/ProductApiSlice";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [productIdSelected, setProductIdSelected] = useState(null);
  const dispatch = useDispatch();
  const { status, error, updateStatus, deleteStatus } = useSelector(
    (state) => state.products
  );
  const { data, hasNextPage, currentPage, lastPage, total } = useSelector(
    (state) => state.products.data
  );

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 7,
  });
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useGetProductsQuery({ ...pageInfo });
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const editHandler = () => {
    navigate(`/adminpanel/edit-product/${productIdSelected}`);
  };
  console.log("products", products);
  // const removeProductHandler = (id) => {
  //   dispatch(deleteProduct({id,token:token})).then(() =>
  //     dispatch(
  //       getProducts({ page: pageInfo.page, limit: pageInfo.countInPage })
  //     )
  //   );
  // };
  const columns = [
    {
      field: "image",
      headerName: "عکس",
      width: 70,
      renderCell: (params) => (
        <div className="table__imageBox">
          <img
            alt="product image"
            className="table__img"
            src={`http://localhost:8000${params.row.image}`}
          />
        </div>
      ),
    },
    { field: "title", headerName: "محصول", width: 250 },
    {
      field: "price",
      headerName: "قیمت",
      width: 200,
      renderCell: (params) => params.row.price.toLocaleString() + " تومان",
    },
    { field: "quantity", headerName: "تعداد", width: 100 },
    { field: "category", headerName: "دسته بندی", width: 100 },
    { field: "brand", headerName: "برند", width: 100 },
    {
      field: "rating",
      headerName: "امتیاز",
      width: 200,
      renderCell: (params) => Star(params.row.rating),
    },
    { field: "action", headerName: "عملیات", width: 100 },
  ];
  const rows = products?.data??[];
  // useEffect(() => {
  //   dispatch(getProducts({ page: pageInfo.page, limit: pageInfo.countInPage }));
  // }, [pageInfo.page, pageInfo.countInPage]);

  return (
    <>
      {isShowEditModal && (
        <Modal
          message="آیا مایل به ویرایش محصول موردنظر هستید؟"
          isShow={isShowEditModal}
          setIsShow={setIsShowEditModal}
          action={editHandler}
        />
      )}

      <div className="table">
        <div className="table__header">
          <h5 className="table__title">لیست محصولات</h5>
          <Link to="/adminpanel/add-products" className="table__btn">
            افزودن محصول جدید
          </Link>
        </div>
        <div className="datagrid__container">

            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row._id}
              rowHeight={40}
              loading={isLoading}
              className="ss02 customdata"
            />
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
