import React, { useState,useRef } from "react";
// library
import { useLocation } from "react-router-dom";
// icons
import { MdAlternateEmail } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";

// components
import Input from "../../components/Input/Input";
import useForm from "../../hooks/useForm";
import { persianTexts } from "../../text";

// styles
import "./Register.css";


export default function Register() {
  const [formState, inputChangeHandler] = useForm(
    {
      phoneNamber: {
        value: "",
        isValid: false,
      },
      userName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword:{
        value:"",
        isValid:false
      },
    },
    false
  );
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
          <form className="auth__form">
            <Input
              inputChangeHandler={inputChangeHandler}
              type="text"
              label="شماره موبایل"
              name="phoneNamber"
              icon=<HiOutlineDevicePhoneMobile className="input__icon" />
              validation="phoneNamber"
              errorText={persianTexts.error.register.input.phoneNumber}
            />
            <Input
              inputChangeHandler={inputChangeHandler}
              type="text"
              label="نام کاربری"
              name="userName"
              icon=<IoPersonOutline className="input__icon" />
              validation="userName"
              errorText={persianTexts.error.register.input.userName}
            />

            <Input
              inputChangeHandler={inputChangeHandler}
              type="email"
              label="ایمیل"
              name="email"
              icon=<MdAlternateEmail className="input__icon" />
              validation="email"
              errorText={persianTexts.error.register.input.email}

            />
            <Input
              inputChangeHandler={inputChangeHandler}
              type="text"
              label="رمز عبور"
              name="password"
              icon=<BiShow className="input__icon" />
              validation="password"
              errorText={persianTexts.error.register.input.password}
            />
            <Input
              inputChangeHandler={inputChangeHandler}
              type="text"
              label="تکرار رمز عبور"
              name="confirmpassword"
              icon=<BiShow className="input__icon" />
              errorText={persianTexts.error.register.input.password}
            />

            <button
              disabled={!formState.isFormValid}
              type="submit"
              className={`register__btn ${
                formState.isFormValid
                  ? "register__btn--active"
                  : "register__btn--disable"
              }`}
            >
              عضویت
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
