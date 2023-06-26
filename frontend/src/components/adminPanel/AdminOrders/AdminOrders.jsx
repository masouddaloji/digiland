import { useState } from "react";
//packages
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";
//rtk query
import {
  useChangeStatusOrderMutation,
  useGetAllOrdersQuery,
} from "../../../features/order/orderApiSlice";
//components
import CustomPagination from "../../Pagination/CustomPagination";
import Loader from "../../Loader/Loader";
import Modal from "../../Modal/Modal";
import Error from "../../Error/Error";
//hooks
import useConvertDate from "../../../hooks/useConvertDate";
import useTitle from "../../../hooks/useTitle";
//persian text
import { persianTexts } from "../../../text";
//icons
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

const AdminOrders = () => {
  useTitle("سفارشات");
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useGetAllOrdersQuery({ page: pageInfo.page, limit: pageInfo.limit });
  const [changeStatusOrder] = useChangeStatusOrderMutation();

  const columns = [
    {
      field: "image",
      headerName: "عکس",
      width: 80,
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
            src={`http://localhost:8000${params.row.productId.image}`}
          />
        </div>
      ),
    },
    {
      field: "_id",
      headerName: "آیدی",
      width: 180,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip title={params.value} classes={{ tooltip: "custom__tooltip" }}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "user",
      headerName: "سفارش دهنده",
      width: 160,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <span>{params.row.userId.email}</span>,
    },
    {
      field: "price",
      headerName: "ارزش",
      width: 160,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <span>{params.row.productId.price.toLocaleString() + " تومان"}</span>
      ),
    },
    {
      field: "createdAt",
      headerName: "تاریخ",
      width: 160,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <span>{useConvertDate(params.value)}</span>,
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 160,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (params.value === "pending")
          return (
            <button className="table__btn table__status--pending">
              در حال بررسی
            </button>
          );
        if (params.value === "delivered")
          return (
            <button className="table__btn table__status--success">
              تایید شده
            </button>
          );
        if (params.value === "cancelled")
          return (
            <button className="table__btn table__status--reject">
              لغو شده
            </button>
          );
      },
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
          <Tooltip title="تایید" classes={{ tooltip: "custom__tooltip" }}>
            <button
              className="accept"
              onClick={() => {
                setIsShowAcceptModal(true);
                setOrderId(params.row._id);
              }}
            >
              <FaCheck className="actions__icon" />
            </button>
          </Tooltip>
          <Tooltip title="رد" classes={{ tooltip: "custom__tooltip" }}>
            <button
              className="delete"
              onClick={() => {
                setIsShowRejectModal(true);
                setOrderId(params.row._id);
              }}
            >
              <RiDeleteBinLine className="actions__icon" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const rows = orders?.data ?? [];

  const acceptOrderHandler = () => {
    const data = {
      orderId,
      status: "delivered",
    };
    changeStatusOrder(data)
      .unwrap()
      .then((res) => {
        console.log("res", res);
        toast.success(persianTexts.adminOrders.orderAcceptSuccess);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(persianTexts.adminOrders.orderAcceptError);
      });
  };
  const rejectOrderHandler = () => {
    const data = {
      orderId,
      status: "cancelled",
    };
    changeStatusOrder(data)
      .unwrap()
      .then((res) => {
        console.log("res", res);
        toast.success(persianTexts.adminOrders.orderReject);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(persianTexts.adminOrders.orderReject);
      });
  };

  return (
    <>
      {isShowAcceptModal && (
        <Modal
          message={persianTexts.adminOrders.acceptModal}
          isShow={isShowAcceptModal}
          setIsShow={setIsShowAcceptModal}
          action={acceptOrderHandler}
        />
      )}
      {isShowRejectModal && (
        <Modal
          message={persianTexts.adminOrders.rejectModal}
          isShow={isShowRejectModal}
          setIsShow={setIsShowRejectModal}
          action={rejectOrderHandler}
        />
      )}
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="table">
          <div className="table__header">
            <h5 className="table__title">
              {persianTexts.adminOrders.tableTitle}
            </h5>
          </div>
          {orders.data.length ? (
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
              {orders?.lastPage > 1 && (
                <CustomPagination
                  page={pageInfo.page}
                  count={orders?.lastPage}
                  setData={setPageInfo}
                />
              )}
            </>
          ) : (
            <Error type="warning" title={persianTexts.adminOrders.notOrders} />
          )}
        </div>
      )}
    </>
  );
};

export default AdminOrders;
