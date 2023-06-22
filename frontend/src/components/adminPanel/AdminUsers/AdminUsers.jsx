import { useState } from "react";
//packages
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
//rtk query
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../features/user/userApiSlice";
//components
import Loader from "../../Loader/Loader";
import CustomPagination from "../../Pagination/CustomPagination";
import Modal from "../../Modal/Modal";
//icons
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
//persian text
import { persianTexts } from "../../../text";
//styles
import "./AdminUsers.css";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [userIdSelected, setUserIdSelected] = useState(null);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useGetUsersQuery({ ...pageInfo });
  const [deleteUser] = useDeleteUserMutation();
  console.log("users", users);
  const rows = users?.data ?? [];

  const columns = [
    {
      field: "name",
      headerName: "نام",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params?.value) {
          return <span>{params.value}</span>;
        } else return <span className="table__invalid">بدون نام</span>;
      },
    },
    {
      field: "email",
      headerName: "ایمیل",
      minWidth: 160,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "phone",
      headerName: "تلفن",
      minWidth: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params?.value) {
          return <span>{params.value}</span>;
        } else return <span className="table__invalid">بدون شماره</span>;
      },
    },
    {
      field: "addresses",
      headerName: "آدرس",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params?.value?.[0]) {
          return (
            <>
              <span>{`${params?.value?.[0]?.state} , `}</span>
              <span>{`${params?.value?.[0]?.city} , `}</span>
              <span>{` ${params?.value?.[0]?.street}`}</span>
            </>
          );
        } else return <span className="table__invalid">آدرس ثبت نشده</span>;
      },
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
    navigate(`/admin-editusers/${userIdSelected}`);
  };
  const removeUserHandler = () => {
    deleteUser(userIdSelected)
      .unwrap()
      .then((res) => {
        toast.success(persianTexts.adminUsers.deleteSuccess);
      })
      .catch((error) => {
        toast.error(persianTexts.adminUsers.deleteError);
      });
  };
  console.log("users", users);
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
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="table">
          <div className="table__header">
            <h5 className="table__title">
              {persianTexts.adminUsers.tableTitle}
            </h5>
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
