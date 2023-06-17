import { useState } from "react";
//packages
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
//rtk query
import { useDeleteUserMutation, useGetUsersQuery } from "../../../features/user/userApiSlice";
//components
import Loader from "../../Loader/Loader";
import CustomPagination from "../../Pagination/CustomPagination";
import Modal from "../../Modal/Modal";
import InfoBasketUser from "../InfoBasketUser/InfoBasketUser";
//icons
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit, FiUser } from "react-icons/fi";
//styles
import "./AdminUsers.css";

const AdminUsers = () => {
  const [userIdSelected, setUserIdSelected] = useState(null);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowBasket, setIsShowBasket] = useState(false);
  const [isShowOrder, setIsShowOrder] = useState(false);
  const [basketDetails, setBbasketDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useGetUsersQuery({ ...pageInfo });
  const [deleteUser]=useDeleteUserMutation()
  const rows = users?.data ?? [];

  const columns = [
    {
      field: "email",
      headerName: "ایمیل",
      minWidth:160,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  
    {
      field: "orders",
      headerName: "سفارشات",
      width:120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <button
        className="table__btn showorder"
          onClick={() => {
            setOrderDetails(params.row.orders);
            setIsShowOrder(true);
          }}
        >سفارشات کاربر
        </button>
      ),
    },
    {
      field: "addresses",
      headerName: "آدرس",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell:(params)=>"لرستان،کوهدشت،شهرک شهید رجایی"
    },
    {
      field: "action",
      headerName: "عملیات ها",
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
              setUserIdSelected(params.row._id);
            }}
          >
            <FiEdit className="actions__icon" />
          </button>
          <button
            className="delete"
            title="حذف"
            onClick={() => {
              setIsShowDeleteModal(true);
              setUserIdSelected(params.row._id);
            }}
          >
            <RiDeleteBinLine className="actions__icon" />
          </button>
        </div>
      ),
    },
  ];
  const editUserHandler = () => {
    console.log("edited");
  };
  const removeUserHandler = () => {
    deleteUser(userIdSelected).unwrap()
    .then(res=>{
      toast.success("کاربر موردنظر با موفقیت حذف شد")
    })
    .catch(error=>{
      toast.error("مشکلی در حذف کاربر موردنظر بوجود آمد")
    })
  };
  console.log("users",users);
  return (
    <>
      {isShowEditModal && (
        <Modal
          message="آیا کاربر مورد نظر ویرایش شود ؟"
          isShow={isShowEditModal}
          setIsShow={setIsShowEditModal}
          action={editUserHandler}
        />
      )}
      {isShowDeleteModal && (
        <Modal
          message="آیا کاربر موردنظر حذف شود ؟"
          isShow={isShowDeleteModal}
          setIsShow={setIsShowDeleteModal}
          action={removeUserHandler}
        />
      )}
      {isShowBasket && <InfoBasketUser details={basketDetails} setisShow={setIsShowBasket} />}
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="table">
          <div className="table__header">
            <h5 className="table__title">لیست کاربران</h5>
            {/* <Link to="/adminpanel/add-products" className="table__btn">
              افزودن محصول
            </Link> */}
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
          {users?.lastPage > 1 && (
            <CustomPagination
              page={users.page}
              count={users?.lastPage}
              setData={setPageInfo}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdminUsers;
