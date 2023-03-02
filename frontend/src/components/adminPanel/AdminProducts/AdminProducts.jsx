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
            {persianTexts.admin.products.label.addProductsTitle}
          </h2>
      <div className="row">
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelTitle}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderTitle}

              type="text"
              name="title"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelPrice}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderPrice}
              type="text"
              name="price"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelRating}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderRating}
              type="text"
              name="rating"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelQuantity}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderQuantity}
              type="text"Placeholder
              name="qantity"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelCategory}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderCategory}
              type="text"
              name="category"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelSegment}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderSegment}
              type="text"
              name="segment"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelColors}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderColors}
              type="text"
              name="colors"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
        
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelBrand}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderBrand}
              type="text"
              name="brand"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelOffPrice}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderOffPrice}
              type="text"
              name="offPrice"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelShortDescription}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderShortDescription}
              type="text"
              name="shortDescription"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
          <div className="col-md-6">
            <Input
              label={persianTexts.admin.products.label.inputLabelFullDescription}
              placeHolder={persianTexts.admin.products.placeholder.inputPlaceholderFullDescription}
              type="text"
              name="fullDescription"
              inputChangeHandler={inputChangeHandler}
              validation="text"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
