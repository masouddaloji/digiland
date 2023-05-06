import React, { useEffect, useState } from "react";
//packages
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
//icons
import {HiChevronRight,HiChevronLeft} from 'react-icons/hi'
import {CgPushChevronRight,CgPushChevronLeft} from 'react-icons/cg'
//styles
import "./CustomPagination.css";

const CustomPagination = ({ total, countInPage, setData }) => {
  const changePageHandler = (e, value) => {
    setData((prev) => ({ ...prev, page: value }));
  };


  return (
    <div className="pagination">
      <Pagination
      className="mui__pagination"
        count={Math.ceil(total / countInPage)}
        color="primary"
        boundaryCount={2}
        onChange={changePageHandler}
        showFirstButton
        showLastButton
        renderItem={(item) => (
    <PaginationItem
      slots={{ previous: HiChevronLeft, next: HiChevronRight,first:CgPushChevronLeft,last: CgPushChevronRight}}
      {...item}
    />
  )}

      />
    </div>
  );
};

export default CustomPagination;
