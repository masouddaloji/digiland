import React, { useEffect, useState } from "react";
//packages
import { DataGrid } from "@mui/x-data-grid";
// variables
import { persianTexts } from "../../../text";
// components
import axios from "./../../../api/axios";
import Error from "../../Error/Error";
import Pagination from "../../Pagination/Pagination";

//icons
import {IoMdClose} from 'react-icons/io'
// styles
import "./AdminProducts.css";
import { Box } from "@mui/material";
const AdminProducts = () => {

  const [pageInfo, setPageInfo] = useState({
    isLoading:false,
    data:[],
    total:0,
    page:1,
    pageSize:10
  });

  const getProducts = async () => {
    await axios
      .get("products")
      .then((res) => setPageInfo(prev=>({...prev,isLoading:false,data:res.data.data,total:res.data.total})))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setPageInfo(prev=>({...prev,isLoading:true}))
    getProducts();
  }, [pageInfo.page,pageInfo.pageSize]);
  const columns = [
    {
      field: "image",
      headerName: "عکس",
      width: 150,
      renderCell: ({value}) => (
        <img
          className="table__img"
          src={`http://localhost:8000${value}`}
        />
      ),
      sortable: false,
    },
    { field: "title", headerName: "نام", width: 300, sortable: false },
    {
      field: "price",
      headerName: "قیمت",
      width: 150,
      renderCell: ({ value }) => (
        <bdi className="productPrice">
          {value.toLocaleString()}
          <span className="toman">تومان</span>
        </bdi>
      ),
    },
    { field: "offPrice", headerName: "تخفیف", width: 100,renderCell:({value})=>value > 0?`% ${value}`:<IoMdClose className="adminPanel__offPriceIcon"/> },
    { field: "quantity", headerName: "تعداد", width: 100 },
    { field: "category", headerName: "دسته بندی", width: 150 },
    { field: "rating", headerName: "امتیاز", width: 100 },
  ];
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          sx={{ fontFamily: "var(--Iran-number)", fontSize: "1.1rem",direction:"rtl"}}
          autoHeight
          rows={pageInfo.data}
          rowCount={pageInfo.total}
          getRowId={(row) => row._id}
          loading={pageInfo.isLoading}
          // rowsPerPageOptions={[5,10,20,30,50]}
          pagination={false}
          page={pageInfo.page-1}
          pageSize={pageInfo.pageSize}
          // paginationMode="server"
          // onPageChange={(newPage)=>setPageInfo(prev=>({...prev,page:newPage+1}))}
          // onPageSizeChange={(newPageSize) =>setPageInfo(prev=>({...prev,pageSize:newPageSize}))}
          columns={columns}
          disableSelectionOnClick
        />
      </Box>
    </>
  );
};

export default AdminProducts;

