import { useEffect, useState } from "react";
//packages
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
//icons
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { CgPushChevronRight, CgPushChevronLeft } from "react-icons/cg";
//styles
import "./CustomPagination.css";

const CustomPagination = ({page, count, setData }) => {
  const changePageHandler = (_, value) => {
    setData((prev) => ({ ...prev, page: value }));
  };

  return (
    <div className="pagination">
      <Pagination
        className="mui__pagination"
        count={count}
        size="small"
        page={page}
        boundaryCount={2}
        onChange={changePageHandler}
        showFirstButton
        showLastButton
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
          className="ss02"
            slots={{
              previous: HiChevronLeft,
              next: HiChevronRight,
              first: CgPushChevronLeft,
              last: CgPushChevronRight,
            }}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default CustomPagination;
