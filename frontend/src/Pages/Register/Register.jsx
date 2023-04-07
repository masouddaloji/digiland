import React, { useState, useRef } from "react";
// packages
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
// icons
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

// components
import FormControl from "../../components/FormControl/FormControl";
// validator``
import { RegisterSchema } from "../../components/Validator/Validator";
// text
import { persianTexts } from "../../text";

// styles
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        registerEmail: "",
        registerPassword: "",
        registerConfirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { resetForm }) => {
        const userData = {
          email: values.registerEmail,
          pwd: values.registerPassword,
        };
        const response = await axios.post("auth/register", userData);
        if (response?.status === 200) {
          toast.success(persianTexts.register.registerSuccess);
          resetForm();
          navigate("/login");
        } else {
          toast.error(persianTexts.register.registerError);
        }
      }}
    >
      {(formik) => (
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
              <Form className="auth__form">
                <FormControl
                  controler="email"
                  label="ایمیل"
                  name="registerEmail"
                  icon=<MdAlternateEmail className="formControl__icon" />
                />
                <FormControl
                  controler="password"
                  label="رمز عبور"
                  name="registerPassword"
                  icon=<RiLockPasswordLine className="formControl__icon"/>
                />
                <FormControl
                  controler="password"
                  label="تکرار رمز عبور"
                  name="registerConfirmPassword"
                  icon=<RiLockPasswordLine className="formControl__icon"/>
                />

                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className={`register__btn ${
                    formik.isValid && formik.dirty
                      ? "register__btn--active"
                      : "register__btn--disable"
                  }`}
                >
                  عضویت
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
