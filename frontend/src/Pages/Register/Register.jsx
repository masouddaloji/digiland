import React, { useState, useRef } from "react";
// library
import { useLocation } from "react-router-dom";
import { Formik, Form, handleSubmit } from "formik";
// icons
import { MdAlternateEmail } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";

// components
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { persianTexts } from "../../text";
import Validator from "../../components/Validator/Validator";

// styles
import "./Register.css";

export default function Register() {
  // const [formState, inputChangeHandler] = useForm(
  //   {
  //     phoneNamber: {
  //       value: "",
  //       isValid: false,
  //     },
  //     userName: {
  //       value: "",
  //       isValid: false,
  //     },
  //     email: {
  //       value: "",
  //       isValid: false,
  //     },
  //     password: {
  //       value: "",
  //       isValid: false,
  //     },
  //     confirmPassword:{
  //       value:"",
  //       isValid:false
  //     },
  //   },
  //   false
  // );
  return (
    <div className="auth">
      <div className="auth__wrapper">
        <div className="auth__content">
          <div className="auth__logoBox">
            <img
              className="auth__logoimg"
              src="./images/logo-mobile.png"
              alt=""
            />
          </div>

          <h4 className="auth__title">ثبت نام</h4>
          <Formik
            initialValues={{
              registerPhoneNumber: "",
              registerUserName: "",
              registerEmail: "",
              registerPassword: "",
              registerConfirmpassword: "",
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={Validator}
          >
            <Form className="auth__form">
              <Input
                label="شماره موبایل"
                type="text"
                name="registerPhoneNumber"
                icon=<HiOutlineDevicePhoneMobile className="input__icon" />
              />
              <Input
                type="text"
                label="نام کاربری"
                name="registerUserName"
                icon=<IoPersonOutline className="input__icon" />
              />

              <Input
                type="email"
                label="ایمیل"
                name="registerEmail"
                icon=<MdAlternateEmail className="input__icon" />
              />
              <Input
                type="text"
                label="رمز عبور"
                name="registerPassword"
                icon=<BiShow className="input__icon" />
              />
              <Input
                type="text"
                label="تکرار رمز عبور"
                name="registerConfirmpassword"
                icon=<BiShow className="input__icon" />
              />

              {/* <button
              disabled={!formState.isFormValid}
              type="submit"
              className={`register__btn ${
                formState.isFormValid
                  ? "register__btn--active"
                  : "register__btn--disable"
              }`}
            >
              عضویت
            </button> */}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
