import { useEffect, useState } from "react";
//packages
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
//rtk query
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../features/Product/ProductApiSlice";
// components
import Star from "../../Star/Star";
import CustomPagination from "../../Pagination/CustomPagination";
import Modal from "../../Modal/Modal";
import Loader from "../../Loader/Loader";

//icons
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
//persian text
import { persianTexts } from "../../../text";
// styles
import "./AdminProducts.css";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [productIdSelected, setProductIdSelected] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data: products,
    isLoading,
    isSuccess,
  } = useGetProductsQuery({ ...pageInfo });
  const [deleteProduct] = useDeleteProductMutation();
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const editHandler = () => {
    navigate(`/admin-editproduct/${productIdSelected}`);
  };
  const removeProductHandler = () => {
    deleteProduct(productIdSelected).unwrap()
      .then((res) => {
        toast.success(persianTexts.adminProduct.deleteProduct.removeProductSuccess);
      })
      .catch((error) => {
        toast.error(persianTexts.adminProduct.deleteProduct.removeProductError);
      });
  };
  const columns = [
    {
      field: "image",
      headerName: "عکس",
      width: 100,
      align: "center",
      headerAlign: "center",
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
    {
      field: "title",
      headerName: "محصول",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "_id",
      headerName: "آیدی",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.row.price.toLocaleString() + " تومان",
    },
    {
      field: "quantity",
      headerName: "تعداد",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "brand",
      headerName: "برند",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "rating",
      headerName: "امتیاز",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => Star(params.row.rating),
    },
    {
      field: "action",
      headerName: "عملیات",
      align: "center",
      width: 120,
      headerAlign: "center",
      renderCell: (params) => (
        <div className="actionBtns">
          <button
            className="edit"
            title="ویرایش"
            onClick={() => {
              setIsShowEditModal(true);
              setProductIdSelected(params.row._id);
            }}
          >
            <FiEdit className="actions__icon" />
          </button>
          <button
            className="delete"
            title="حذف"
            onClick={() => {
              setIsShowDeleteModal(true);
              setProductIdSelected(params.row._id);
            }}
          >
            <RiDeleteBinLine className="actions__icon" />
          </button>
        </div>
      ),
    },
  ];

  const rows = products?.data ?? [];

  return (
    <>
      {isShowEditModal && (
        <Modal
          message={persianTexts.adminProduct.deleteModalTitle}
          isShow={isShowEditModal}
          setIsShow={setIsShowEditModal}
          action={editHandler}
        />
      )}
      {isShowDeleteModal && (
        <Modal
          message={persianTexts.adminProduct.editModalTitle}
          isShow={isShowDeleteModal}
          setIsShow={setIsShowDeleteModal}
          action={removeProductHandler}
        />
      )}
        {isLoading&& <Loader />}
      {isSuccess && <div className="table">
        <div className="table__header">
          <h5 className="table__title">لیست محصولات</h5>
          <Link to="/admin-addproducts" className="table__btn btn__black">
            افزودن محصول
          </Link>
        </div>
        <div className="datagrid__container">
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            rowHeight={45}
            columnHeaderHeight={40}
            loading={isLoading}
            disableColumnSelector={true}
            disableRowSelectionOnClick={true}
            className="ss02 customdata"
          />
        </div>
        {products?.lastPage > 1 && (
          <CustomPagination
            page={pageInfo.page}
            count={products?.lastPage}
            setData={setPageInfo}
          />
        )}
      </div>}
    </>
  );
};

export default AdminProducts;
