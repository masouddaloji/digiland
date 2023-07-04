import { useState } from "react";
//packages
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";
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
import Error from "../../Error/Error";
//hooks
import useTitle from "../../../hooks/useTitle";
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
  const editHandler =() => {
    navigate(`/admin-editproduct/${productIdSelected}`);
  }
  const removeProductHandler =() => {
    deleteProduct(productIdSelected)
      .unwrap()
      .then((res) => {
        toast.success(
          persianTexts.adminProduct.deleteProduct.removeProductSuccess
        );
      })
      .catch((error) => {
        toast.error(persianTexts.adminProduct.deleteProduct.removeProductError);
      });
  }

  const columns = [
    {
      field: "image",
      headerName: "عکس",
      width: 60,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
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
      minWidth: 200,
      flex: 1,
      align: "start",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} classes={{ tooltip: "custom__tooltip" }}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip
          title={params.value.toLocaleString() + " تومان"}
          classes={{ tooltip: "custom__tooltip" }}
        >
          <span>{params.value.toLocaleString() + " تومان"}</span>
        </Tooltip>
      ),
    },
    {
      field: "quantity",
      headerName: "تعداد",
      width: 60,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} classes={{ tooltip: "custom__tooltip" }}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "rating",
      headerName: "امتیاز",
      minWidth: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => Star(params.row.rating),
    },
    {
      field: "action",
      headerName: "عملیات ها",
      align: "center",
      width: 100,
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="actionBtns">
          <Tooltip title="ویرایش" classes={{ tooltip: "custom__tooltip" }}>
            <button
              className="edit"
              onClick={() => {
                setIsShowEditModal(true);
                setProductIdSelected(params.row._id);
              }}
            >
              <FiEdit className="actions__icon" />
            </button>
          </Tooltip>
          <Tooltip title="حذف" classes={{ tooltip: "custom__tooltip" }}>
            <button
              className="delete"
              onClick={() => {
                setIsShowDeleteModal(true);
                setProductIdSelected(params.row._id);
              }}
            >
              <RiDeleteBinLine className="actions__icon" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = products?.data ?? [];
  useTitle("محصولات")
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
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="table ss02">
          <div className="table__header">
            <h5 className="table__title">
              {persianTexts.adminProduct.tableTitle}
            </h5>
            <Link to="/admin-addproducts" className="table__btn btn__black">
              {persianTexts.adminProduct.addproduct}
            </Link>
          </div>
          {products.data.length ? (
            <>
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
            </>
          ) : (
            <Error
              type="warning"
              title={persianTexts.adminProduct.notProducts}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdminProducts;
