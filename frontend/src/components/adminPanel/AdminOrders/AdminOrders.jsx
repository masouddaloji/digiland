import { useState } from "react";
//packages
import { DataGrid } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
//rtk query
import { useGetAllOrdersQuery } from "../../../features/order/orderAliSlice";
//components
import CustomPagination from "../../Pagination/CustomPagination";
import Loader from "../../Loader/Loader";

const AdminOrders = () => {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useGetAllOrdersQuery({ page: pageInfo.page, limit: pageInfo.limit });

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
        <Tooltip
          title={params.value}
          classes={{ tooltip: "custom__tooltip" }}
        >
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
      renderCell: (params) => (
          <span>{params.row.userId.email}</span>
      ),
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
          <span>{params.row.productId.price.toLocaleString()+" تومان"}</span>
      ),
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 160,
      align: "center",
      headerAlign: "center",
      editable: true,
      type:"singleSelect",
      valueOptions:["درحال بررسی","تایید شده","لغو شده"],
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
          if (params.value==="pending") return <button className="table__btn table__status--pending">در حال بررسی</button>
          if (params.value==="success") return <button className="table__btn table__status--success">تایید شده</button>
          if (params.value==="reject") return <button className="table__btn table__status--reject">لغو شده</button>
      },
    },
  ];
  const rows = orders?.data ?? [];

  console.log("orders", orders);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="table">
          <div className="table__header">
            <h5 className="table__title">لیست سفارشات</h5>
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
          {orders?.lastPage > 1 && (
            <CustomPagination
              page={pageInfo.page}
              count={orders?.lastPage}
              setData={setPageInfo}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdminOrders;
