import { useState } from "react";
//packages
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import {Tooltip } from "@mui/material";
import { toast } from "react-toastify";
//rtk query
import { useDeleteArticleMutation, useGetArticlesQuery } from "../../../features/article/articleApiSlice";
//hooks
import useTitle from "../../../hooks/useTitle";
//components
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
import Modal from "../../Modal/Modal";
//persian text
import { persianTexts } from "../../../text";
//icons
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const AdminArticles = () => {
  const navigate = useNavigate();
  const [articleIdSelected, setArticleIdSelected] = useState(null);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data: articles,
    isLoading,
    isSuccess,
  } = useGetArticlesQuery({ page: pageInfo.page, limit: pageInfo.limit });
  const [deleteArticle]=useDeleteArticleMutation()
  const rows = articles?.data ?? [];
  const columns = [
    {
      field: "image",
      headerName: "عکس",
      minWidth: 60,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="table__imageBox">
          <img
          alt="article image"
          className="table__img"
          src={`http://localhost:8000${params.value}`}
        />
        </div>
      ),
    },
    {
      field: "title",
      headerName: "عنوان",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} classes={{ tooltip: "custom__tooltip" }}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "writer",
      headerName: "نویسنده",
      minWidth: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} classes={{ tooltip: "custom__tooltip" }}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "category",
      headerName: "دسته بندی",
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} classes={{ tooltip: "custom__tooltip" }}>
          <span>{params.value}</span>
        </Tooltip>
      ),
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
                setArticleIdSelected(params.row._id);
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
                setArticleIdSelected(params.row._id);
              }}
            >
              <RiDeleteBinLine className="actions__icon" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const editHandler = () => {
    navigate(`/admin-editarticles/${articleIdSelected}`)
  };
  const removeArticleHandler = () => {
    deleteArticle(articleIdSelected).unwrap()
    .then(res=>{
      toast.success(persianTexts.adminArticle.deleteArticleSuccess)
    })
    .catch(error=>{
      toast.error(persianTexts.adminArticle.deleteArticleError)
    })
  };
  useTitle("مقالات")
  return (
    <>
      {isShowEditModal && (
        <Modal
          message={persianTexts.adminArticle.editModal}
          isShow={isShowEditModal}
          setIsShow={setIsShowEditModal}
          action={editHandler}
        />
      )}
      {isShowDeleteModal && (
        <Modal
          message={persianTexts.adminArticle.deleteModal}
          isShow={isShowDeleteModal}
          setIsShow={setIsShowDeleteModal}
          action={removeArticleHandler}
        />
      )}
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="table">
          <div className="table__header">
            <h5 className="table__title">{persianTexts.adminArticle.tableTitle}</h5>
            <Link to="/admin-addarticles" className="table__btn btn__black">
              {persianTexts.adminArticle.addLink}
            </Link>
          </div>
          {articles?.data?.length ? (
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
              {articles?.lastPage > 1 && (
                <CustomPagination
                  page={pageInfo.page}
                  count={articles?.lastPage}
                  setData={setPageInfo}
                />
              )}
            </>
          ) : (
            <Error type="warning" title={persianTexts.adminArticle.notFoundArticle} />
          )}
        </div>
      )}
    </>
  );
};

export default AdminArticles;
