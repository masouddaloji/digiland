import { useState } from "react";
//packages
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
//rtk query
import { useGetArticlesQuery } from "../../../features/article/articleApiSlice";
//components
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
import { Tooltip } from "@mui/material";

const AdminArticles = () => {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data: articles,
    isLoading,
    isSuccess,
  } = useGetArticlesQuery({ page: pageInfo.page, limit: pageInfo.limit });
  console.log("articles", articles);
  const rows = articles?.data ?? [];
  const columns = [
    {
      field: "image",
      headerName: "عکس",
      minWidth: 80,
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <img
          alt="article image"
          className="table__img"
          src={`http://localhost:8000${params.value}`}
        />
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
      minWidth: 160,
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
      minWidth: 160,
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
      minWidth: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} classes={{ tooltip: "custom__tooltip" }}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
  ];
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="table">
          <div className="table__header">
            <h5 className="table__title">لیست مقاله ها</h5>
            <Link to="/admin-addarticles" className="table__btn btn__black">
              افزودن مقاله
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
            <Error type="warning" title="مقاله ای وجود ندارد" />
          )}
        </div>
      )}
    </>
  );
};

export default AdminArticles;
