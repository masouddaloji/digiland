import { useCallback, useState } from "react";
//packages
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//rtk query
import { useGetOrdersQuery, useRemoveOrderByUserMutation } from "../../../features/order/orderApiSlice";
//components
import Modal from "../../Modal/Modal";
import Error from "../../Error/Error";
import Loader from "../../Loader/Loader";
//hooks
import useAuth from "../../../hooks/useAuth";
import useConvertDate from "../../../hooks/useConvertDate";
import useTitle from "../../../hooks/useTitle";
//persian text
import { persianTexts } from "../../../text";
//styles
import "./Orders.css";

const Orders = () => {
  const[orderId,setOrderId]=useState(null)
  const[isShowDeleteOrder,setIsShowDeleteOrder]=useState(false)
  const { userID } = useAuth();
  // const { data, isLoading, isSuccess } = useGetUserByIdQuery(userID);
  const{data:orders ,isLoading,isSuccess}=useGetOrdersQuery(userID)
  const [removeOrderByUser]=useRemoveOrderByUserMutation()
  const navigate = useNavigate();
  useTitle("سفارشات کاربر")

  const rejectOrderHandler=useCallback(()=>{
    removeOrderByUser(orderId).unwrap()
    .then(res=>{
      toast.success(persianTexts.userOrders.successDelete)
    })
    .catch(error=>{
      toast.error(persianTexts.userOrders.errorDelete)
      console.log("error",error);
    })
  },[])


  return (
    <>
          {isShowDeleteOrder && (
        <Modal
          message={persianTexts.userOrders.modalMessage}
          isShow={isShowDeleteOrder}
          setIsShow={setIsShowDeleteOrder}
          action={rejectOrderHandler}
        />
      )}
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="user-order">
          {orders?.length ? (
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
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td data-title="سفارش">{order._id}</td>
                      <td data-title="تاریخ">
                        {useConvertDate(order.createdAt)}
                      </td>
                      <td data-title="وضعیت">
                        {order.status === "pending" ? "در حال بررسی":order.status === "delivered" ? "تایید شده" : "رد شده"}
                      </td>
                      <td data-title="ارزش">
                        {`${order.productId.price.toLocaleString()} تومان`}
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
                          <button className="cansel-orderBtn" onClick={()=>{
                            setOrderId(order._id)
                            setIsShowDeleteOrder(true)
                          }}>لغو سفارش</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Error type="warning" title={persianTexts.userOrders.notFound} />
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
