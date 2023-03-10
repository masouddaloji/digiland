import React from "react";
// variables
import { persianTexts } from "../../../text";
// components
import Error from "../../Error/Error";
import Pagination from "../../Pagination/Pagination";
import Table from "../../Table/Table";


// styles
import "./AdminProducts.css";
const AdminProducts = () => {
  return (
  <>
    <Table/>
    <Pagination/>
  </>
  );
};

export default AdminProducts;
