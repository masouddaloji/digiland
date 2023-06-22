//packages
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
//rtk query
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
import { useGetOrdersQuery } from "../../../features/order/orderAliSlice";
//components
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
//hooks
import useAuth from "../../../hooks/useAuth";
import useConvertDate from "../../../hooks/useConvertDate";
//styles
import "./Orders.css";

const Orders = () => {
  const { userID } = useAuth();
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(userID);
  const navigate = useNavigate();
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
  console.log("data", data);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="user-order">
          {data.orders?.length ? (
            <div className="user__table__wrapper">
              <table className="user__table">
                <thead>
                  <tr>
                    <th>سفارش</th>
                    <th>تاریخ</th>
                    <th>وضعیت</th>
                    <th>ارزش</th>
                    <th>عملیات‌ها</th>
                  </tr>
                </thead>
                <tbody>
                  {data.orders.map((order) => (
                    <tr key={order._id}>
                      <td data-title="سفارش">{order._id}</td>
                      <td data-title="تاریخ">
                        {useConvertDate(order.createdAt)}
                      </td>
                      <td data-title="وضعیت">
                        {order.status === "pending" ? "در حال بررسی" : null}
                      </td>
                      <td data-title="ارزش">
                        {order.productId.price.toLocaleString()}
                      </td>
                      <td data-title="عملیات‌ها">
                        <div className="actionBtns">
                          <button
                            className="show-orderBtn"
                            onClick={() =>
                              navigate(`/userorderInfo/${order._id}`)
                            }
                          >
                            نمایش
                          </button>
                          <button className="cansel-orderBtn">لغو سفارش</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Error type="warning" title="سفارشی یافت نشد" />
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
