import React from "react";
// variables
import { persianTexts } from "../../../text";
// components
import Error from "../../Error/Error";
import Input from "./../../Input/Input";
import useForm from "../../../hooks/useForm";
// styles
import "./AdminProducts.css";
const AdminProducts = () => {
  // <Error title={persianTexts.error.adminpanel.products}/>
  const [formState, inputChangeHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  return (
    <section className="adminSection">
        <div className="table__wrapper">
          <h2 className="table__header">
            {persianTexts.admin.products.addProductsTitle}
          </h2>
      <div className="row">
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.inputLabelTitle}
              type="text"
              name="title"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.inputLabelCover}
              type="file"
              name="cover"
              inputChangeHandler={inputChangeHandler}
              validation="cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
