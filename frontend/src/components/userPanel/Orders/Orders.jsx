//packages
import { DataGrid } from "@mui/x-data-grid";
//rtk query
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
import { useGetOrdersQuery } from "../../../features/order/orderAliSlice";

//hooks
import useAuth from "../../../hooks/useAuth";
import useConvertDate from "../../../hooks/useConvertDate";
//styles
import "./Orders.css";


const Orders = () => {
  const{userID}=useAuth()
  const{data,isLoading,isSuccess}=useGetUserByIdQuery(userID)
  const{data:order,isLoading:orderLoading,isSuccess:orderSuccess}=useGetOrdersQuery(userID)

  const rows = [
    {
      _id: 1012,
      orderID: "#3414",
      date: new Date(),
      status: "در حال بررسی",
      total: 9950000,
    },
    {
      _id: 1013,
      orderID: "#8694",
      date: new Date(),
      status: "در حال بررسی",
      total: 10250000,
    },
  ];
  console.log("order",order);
  return (
    <div className="user-order">
 
      <div className="user__table__wrapper">
      <table className="user__table">
        <thead>
          <tr>
            <th>سفارش</th>
            <th>تاریخ</th>
            <th>وضعیت</th>
            <th>مجموع</th>
            <th>عملیات‌ها</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              <td data-title="سفارش">{row.orderID}</td>
              <td data-title="تاریخ">{useConvertDate(row.date)}</td>
              <td data-title="وضعیت">{row.status}</td>
              <td data-title="مجموع">{row.total.toLocaleString()}</td>
              <td data-title="عملیات‌ها">
                {" "}
                <div className="actionBtns">
                  <button className="show-orderBtn">نمایش</button>
                  <button className="cansel-orderBtn">لغو سفارش</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Orders;
