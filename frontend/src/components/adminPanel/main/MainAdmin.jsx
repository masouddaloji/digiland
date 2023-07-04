
//packages
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
//rtk query
import { useGetAllOrdersQuery } from "../../../features/order/orderApiSlice";
// components
import Chart from "../Chart/Chart";
import ItemBoxAPanel from "../ItemBoxAPanel/ItemBoxAPanel";
import Loader from "../../Loader/Loader";
//hooks
import useConvertDate from "../../../hooks/useConvertDate";
import useTitle from "../../../hooks/useTitle";
// adminPanelItems
import { adminPanelItems } from "./../../../Constants";
//persiantext
import { persianTexts } from "../../../text";
// styles
import "./MainAdmin.css";

const MainAdmin = () => {
  const { data: orders, isLoading, isSuccess } = useGetAllOrdersQuery({page:1,limit:6});
  const columns = [
    {
      field: "_id",
      headerName: "آیدی",
      width: 180,
      align: "start",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "محصول",
      minWidth: 200,
      flex: 1,
      align: "start",
      headerAlign: "center",
      renderCell: (params) => params.row.productId.title,
    },
    {
      field: "date",
      headerName: "تاریخ",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => useConvertDate(params.row.createdAt),
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.status === "success") {
          return (
            <span className="table__price--success">{`+ ${params.row.productId.price.toLocaleString()} تومان`}</span>
          );
        } else if (params.row.status === "pending") {
          return (
            <span className="table__price--pending">{`${params.row.productId.price.toLocaleString()} تومان`}</span>
          );
        } else {
          return (
            <span className="table__price--reject">{`- ${params.row.productId.price.toLocaleString()} تومان`}</span>
          );
        }
      },
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.status === "success") {
          return (
            <span className="table__btn table__status--success">تکمیل شده</span>
          );
        } else if (params.row.status === "pending") {
          return (
            <span className="table__btn table__status--pending">
              در حال بررسی
            </span>
          );
        } else {
          return (
            <span className="table__btn table__status--reject">لغو شده</span>
          );
        }
      },
    },

  ];
  const rows = orders?.data ?? [];

 useTitle("داشبورد")
  return (
  <>
  {isLoading && <Loader />}
    {isSuccess && 
      <div className="indexAdmin">
      <div className="row">
        {adminPanelItems.map((item) => (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={item.id}>
            <ItemBoxAPanel {...item} />
          </div>
        ))}
      </div>
      {/* chart */}
      <div className="row">
        <div className="col-12">
          <Chart />
        </div>
      </div>
      {/* table */}
      <div className="row">
        <div className="col-12">
          <div className="table">
            <div className="table__header">
              <h5 className="table__title">{persianTexts.mainAdmin.lastOrders}</h5>
              <Link to="/admin-addproducts" className="table__btn btn__black">
              {persianTexts.mainAdmin.allOrders}
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
          </div>
        </div>
      </div>
    </div>
    }
  </>
  );
};

export default MainAdmin;
